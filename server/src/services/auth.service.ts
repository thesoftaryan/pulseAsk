import bcrypt from "bcrypt";
import { User } from "../models/User.model";
import { ApiError } from "../utils/ApiError.util";
import { STATUS } from "../constants/statusCodes";

// importing types of Payload
import { LoginPayload, RegisterPayload } from "../types/auth.types";

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
}