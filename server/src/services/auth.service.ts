import bcrypt from "bcrypt";
import { User } from "../models/User.model";
import { ApiError, RedirectError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes";

// Verification Part
import { generateRandomToken } from "../utils/token.util";

// importing types of Payload
import { ForgotPasswordPayload, LoginPayload, RefreshTokenPayload, RegisterPayload, ResetPasswordPayload, TokenData, VerifyEmailPayload } from "../types/auth.types";
import { generateHash } from "../utils/hash.util";
import { signToken, verifyToken } from "../utils/jwt.util";


/**
 * Refresh Token Service for pulseAsk
 * @param payload of type RefreshTokenPayload
 * @returns new access token
 */
export const refreshTokenService = async (payload : RefreshTokenPayload)=>{
    try{
        // console.log("payload.refresh_token : ",payload.refresh_token);
        const data = verifyToken(payload.refresh_token,"refresh") as TokenData;
        const tokenPayload = {
            uid : data.uid,
            email : data.email,
        };
        const newAccessToken = signToken(tokenPayload, "access");
        return newAccessToken;
    }catch(error){
        // console.error("refresh error : ", error);
        throw new ApiError(
            STATUS.CLIENT_ERROR.UNAUTHORIZED,
            "Refresh token invalid or expired",
        );
    }
}

/**
 * Register Service for pulseAsk
 * @param payload : RegisterPayload -> data received over http
 * @returns user : User Model -> Newly created user
 */
export const registerUser = async (payload : RegisterPayload) => {
    const {email, password} = payload;
    const firstName = payload.first_name;
    const lastName = payload.last_name;

    const userCheck = await User.findOne({email});

    if(userCheck){
        throw new ApiError(
            STATUS.CLIENT_ERROR.CONFLICT,
            "Email already exists",
        );
    }

    const {rawToken, hashedToken} = generateRandomToken();

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
        firstName,
        lastName,
        password : hashedPassword,
        email,
        emailVerificationToken : hashedToken,
        emailVerificationExpires : new Date(
            Date.now() + 10*60*1000 // 10 minutes
        ),
    });

    user.password = undefined as unknown as string;

    return {user, rawToken};
};



/**
 * Login Service for pulseAsk
 * @param email string
 * @param password string
 * @returns authenticated user (with stripped password)
*/
export const loginUser = async (payload : LoginPayload) => {
    const {email, password} = payload;
    // .select("+password") is required because in model we have 
    // specified not to select password field whenever any query
    // is made, so we are specifically asking for password in 
    // this case.
    const user = await User.findOne({email}).select("+password");

    if(!user){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Invalid email or password",
        );
    }

    const check = await bcrypt.compare(password, user.password);
    if(!check){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Invalid email or password",
        );
    }


    if(!user.emailVerified){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Verify your email to continue",
        )
    }

    // because we don't want anyone else to know about the password
    // we are using unknown because undefined can't be directly
    // typecasted as string
    user.password = undefined as unknown as string;
    return user;
};

/**
 * Email verification service for pulseAsk
 * @param token of the type string
 * @returns Nothing
 */
export const verifyEmail = async (token : any) =>{

    if(!token){
        throw new RedirectError(
            `${process.env.CLIENT_URL}/auth/verify-email?status=invalid`,
        );
    }

    const hashedToken = generateHash(token as string);

    const user = await User.findOne({
        emailVerificationToken : hashedToken,
        emailVerificationExpires: {$gt: Date.now()},
    });

    if(!user){
        throw new RedirectError(
            `${process.env.CLIENT_URL}/auth/verify-email?status=expired`,
        );
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();
}

/**
 * Resend email verification link service for pulseAsk
 * @param payload of type VerifyEmailPayload
 * @returns rawToken:string which is then sent to the user via email
 */
export const resendEmailVerificationLink = async (payload : VerifyEmailPayload)=>{
    const {email} = payload;

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Error sending link",
        );
    }

    if(user.emailVerified){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Email is already verified",
        )
    }

    const {rawToken, hashedToken} = generateRandomToken();

    user.emailVerificationToken = hashedToken;
    user.emailVerificationExpires = new Date(Date.now() + 10*60*1000); // 10 minutes

    await user.save();
    return rawToken;
}

/**
 * Forgot Password Service for pulseAsk
 * @param payload of Type ForgotPasswordPayload
 * @returns Token for resetting password
 */
export const forgotPassword = async ( payload : ForgotPasswordPayload)=>{
    const {email} = payload;

    const user = await User.findOne({email});

    if(!user){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Error sending link",
        );
    }

    const {rawToken, hashedToken} = generateRandomToken();

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 10*60*1000);//10 minutes

    await user.save();

    return rawToken;
}

/**
 * Reset Password Service for pulseAsk
 * @param payload of Type ResetPasswordPayload
 * @returns Nothing
 */
export const resetPassword = async (payload : ResetPasswordPayload)=>{
    const {password, token} = payload;

    const hashedToken = generateHash(token);

    const user = await User.findOne({
        resetPasswordToken : hashedToken,
        resetPasswordExpires : {$gt : Date.now()},
    });

    if(!user){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Reset Link is expired or invalid",
        );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
}

/**
 * Fetches the user
 * @param payload of Type TokenData
 * @returns the user with that credentials
 */
export const meService = async (payload : TokenData)=>{
    const user = User.findById(payload.uid);
    if(!user){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "User not found",
        );
    }
    return user;
}