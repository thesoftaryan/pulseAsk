import bcrypt from "bcrypt";
import { User } from "../models/User.model";
import { ApiError } from "../utils/ApiError";
import { STATUS } from "../constants/statusCodes";


export const loginUser = async (email : string, password : string) => {
    // .select("+password") is required because in model we have 
    // specified not to select password field whenever any query
    // is made, so we are specifically asking for password in 
    // this case.
    const user = await User.findOne({email}).select("+password");

    if(!user){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Invalid email or password",
            "Invalid email or password",
        );
    }

    const check = await bcrypt.compare(password, user.password);
    if(!check){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Invalid email or password",
            "Invalid email or password",
        );
    }
    user.password = "";
    return user;
}