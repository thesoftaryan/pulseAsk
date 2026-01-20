import {Request, Response} from "express";
import axios from "axios";

// Custom status codes for http responses
import { STATUS } from "../constants/statusCodes";

// Custom response structure
import { errorResponse, successResponse, redirectResponse} from "../utils/response.util"

// Types
import { LoginPayload, RegisterPayload, ForgotPasswordPayload, GoogleTokenResponse, GoogleUserInfo, ResetPasswordPayload, VerifyEmailPayload, RefreshTokenPayload, TokenData } from "../types/auth.types";

// Auth Services
import { forgotPassword, loginUser, refreshTokenService, registerUser, resendEmailVerificationLink, resetPassword, verifyEmail } from "../services/auth.service";
import { signToken } from "../utils/jwt.util";
import { User } from "../models/User.model";

// verification
import { sendResetPasswordMail, sendVerificationMail } from "../services/email.service";


export const googleOAuthCallbackController = async (req : Request, res : Response) => {
    const code = req.query.code as string;
    // console.log("google callback code: ", code);
    
    if(!code){
        return redirectResponse(res, `${process.env.CLIENT_URL}/login`);
    }

    const tokenResponse = await axios.post<GoogleTokenResponse>("https://oauth2.googleapis.com/token",{
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        code,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL,
        grant_type: "authorization_code",
    });

    const {access_token} = tokenResponse.data;
    // console.log(access_token);

    const userInfoResponse = await axios.get<GoogleUserInfo>(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        }
    );

    const googleUser = userInfoResponse.data;

    // console.log("Google User: ", googleUser);

    let user = await User.findOne({email : googleUser.email});

    if(!user){
        // console.log("user wasn't found");
        user = await User.create({
            firstName : googleUser.given_name,
            lastName : googleUser.family_name,
            email: googleUser.email,
            authProvider: "google",
            providerId : googleUser.sub,
            password : null,
            emailVerified : true,
        });
    }

    const tokenPayload = {
        uid : user._id,
        email : user.email,
    } as TokenData;

    const accessToken = signToken(tokenPayload, "access");
    const refreshToken = signToken(tokenPayload, "refresh");

    return res
    .cookie("access_token", accessToken, {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })
    .cookie("refresh_token", refreshToken, {
        httpOnly : true,
        secure : process.env.NODE_ENV === "production",
        sameSite : "strict",
    })
    .redirect(`${process.env.CLIENT_URL}/home`);
};

export const googleOAuthController = (req:Request, res : Response)=>{
    const params = new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID!,
        redirect_uri: process.env.GOOGLE_CALLBACK_URL!,
        response_type: "code",
        scope: "openid email profile",
        access_type: "offline", // To request refresh tokens
        prompt: "consent", 
    });
    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    return redirectResponse(res, googleAuthURL);
};


export const refreshTokenController = async (req : Request, res : Response)=>{
    const refreshToken = req.cookies?.refresh_token;
    if(!refreshToken){
        return errorResponse(
            res,
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Refresh token is required",
        );
    }
    const newAccessToken = await refreshTokenService({refresh_token : refreshToken});
    res.cookie("access_token", newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        // 15 minutes (in milliseconds)
        maxAge: 15 * 60 * 1000,
    });
    
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Access token refreshed",
    );
};

export const registerController = async (req: Request, res: Response)=>{
    // This will just print [object, object] because when using
    // backticks javascript does : req.body.toString() and
    // for object this function '.toString()' returns [object, object]
    // console.log(`Data received for register : ${req.body}`);
    // Correct :
    // console.log("Data received for register : ", req.body);
    
    const payload = req.body as RegisterPayload;
    
    const {user, rawToken} = await registerUser(payload);
    
    sendVerificationMail(user.email, rawToken);
    
    console.log(user);
    
    return successResponse(
        res,
        STATUS.SUCCESS.CREATED,
        "User registration successfull, Please verify your email.",
        user,
    );
};

export const loginController = async (req: Request, res: Response)=>{
    const payload = req.body as LoginPayload;
    
    const user = await loginUser(payload);
    
    // console.log(user);
    
    const tokenPayload = {
        uid : user._id,
        email: user.email,
    } as TokenData;
    
    const accessToken = signToken(tokenPayload, "access");
    const refreshToken = signToken(tokenPayload, "refresh");
    
    res.cookie("access_token", accessToken, {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        // 15 minutes (in milliseconds)
        maxAge: 15 * 60 * 1000,
    });
    
    res.cookie("refresh_token", refreshToken, {
        httpOnly : true,
        secure : process.env.NODE_ENV==="production",
        sameSite: "strict",
        // 30 days (in milliseconds)
        // undefined is used to create a session cookie
        maxAge : payload.remember_me? 30*24*60*60*1000 : undefined,
    });
    
    
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "User Login Successfull",
        {
            uid : user._id,
            email : user.email,
            firstName : user.firstName,
            lastName : user.lastName,
        }
    );
};

export const logoutController = (req : Request, res : Response)=>{
    res.clearCookie("access_token");
    res.clearCookie("refresh_token");
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Logout successful",
    );
};


export const resendEmailVerificationLinkController = async (req:Request, res:Response)=>{
    const data = req.body as VerifyEmailPayload;
    
    const token = await resendEmailVerificationLink(data);
    
    sendVerificationMail(data.email, token);
    
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "If account exists, a verification link has been sent.",
    );
};

export const emailVerificationController = async (req : Request, res : Response)=>{
    const {token} = req.query;

    await verifyEmail(token);

    return redirectResponse(
        res,
        `${process.env.CLIENT_URL}/auth/verify-email?status=success`,
    );

};

export const forgotPasswordController = async (req : Request, res : Response) => {
    
    const data = req.body as ForgotPasswordPayload;
    
    const token = await forgotPassword(data);
    
    sendResetPasswordMail(data.email, token);
    
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "If account exists, a reset link has been sent.",
    );
};

export const resetPasswordController = async (req : Request, res : Response) => {
    
    const data = req.body as ResetPasswordPayload;
    
    await resetPassword(data);
    
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Password changed successfully",
    )
};