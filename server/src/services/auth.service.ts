import bcrypt from "bcrypt";
import { User } from "../models/User.model";
import { ApiError } from "../utils/apiError.util";
import { STATUS } from "../constants/statusCodes";

// Verification Part
import { generateRandomToken } from "../utils/token.util";

// importing types of Payload
import { ForgotPasswordPayload, LoginPayload, RegisterPayload } from "../types/auth.types";


/**
 * Register Service for pulseAsk
 * @param payload : RegisterPayload -> data received over http
 * @returns user : User Model -> Newly created user
 */
export const registerUser = async (payload : RegisterPayload) => {
    const {firstName, lastName, email, password} = payload;

    const userCheck = await User.findOne({email});

    if(userCheck){
        throw new ApiError(
            STATUS.CLIENT_ERROR.CONFLICT,
            "User with this email already exists",
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
    // because we don't want anyone else to know about the password
    // we are using unknown because undefined can't be directly
    // typecasted as string
    user.password = undefined as unknown as string;
    return user;
};


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

    const {rawToken, hashedToken} = generateRandomToken(email);

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = new Date(Date.now() + 10*60*1000);//10 minutes

    await user.save();

    return rawToken;
}