import {Request, Response} from "express";
import axios from "axios";

// Custom status codes for http responses
import { STATUS } from "../constants/statusCodes";

// Custom response structure
import { successResponse} from "../utils/response.util"

// Types
import { LoginPayload, RegisterPayload, GoogleTokenResponse, GoogleUserInfo } from "../types/auth.types";

// Auth Services
import { loginUser, registerUser } from "../services/auth.service";
import { signToken } from "../utils/jwt.util";
import { User } from "../models/User.model";

// verification
import { sendVerificationMail } from "../services/email.service";

export const googleOAuthCallbackController = async (req : Request, res : Response) => {
    const code = req.query.code as string;
    // console.log("google callback code: ", code);
    
    if(!code){
        return res.redirect(`${process.env.CLIENT_URL}/login`);
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
            provider: "google",
            providerId : googleUser.sub,
            password : null,
            emailVerified : true,
        });
    }

    const token = signToken({
        uid : user._id,
        email: user.email,
    });

    return res
    .cookie("access_token", token, {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
    })
    .redirect(`${process.env.CLIENT_URL}/home`);
}

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
    return res.redirect(googleAuthURL);
}

export const registerController = async (req: Request, res: Response)=>{
    // This will just print [object, object] because when using
    // backticks javascript does : req.body.toString() and
    // for object this function '.toString()' returns [object, object]
    // console.log(`Data received for register : ${req.body}`);
    // Correct :
    // console.log("Data received for register : ", req.body);

    const payload = req.body as RegisterPayload;

    const user = await registerUser(payload);

    sendVerificationMail(user.email, "just-a-test-token");

    console.log(user);

    return successResponse(
        res,
        STATUS.SUCCESS.CREATED,
        "User registration successfull",
        user,
    );
}

export const loginController = async (req: Request, res: Response)=>{
    const payload = req.body as LoginPayload;
    
    const user = await loginUser(payload);

    // console.log(user);

    const tokenPayload = {
        uid : user._id,
        email: user.email,
    }

    const token = signToken(tokenPayload);

    res.cookie("access_token", token, {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        // 14 days (in milliseconds)
        maxAge: 14 * 24 * 60 * 60 * 1000,
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
}

export const logoutController = (req : Request, res : Response)=>{
    res.clearCookie("access_token");
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Logged out successfully",
    );
}