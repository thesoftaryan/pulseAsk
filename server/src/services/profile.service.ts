import { STATUS } from "../constants/statusCodes";
import { User } from "../models/User.model";
import { FetchProfilePayload } from "../types/profile.type";
import { ApiError } from "../utils/error.util";


/**
 * @param data of type FetchProfilePayload
 * @returns user of type UserInterface
 */
export const fetchProfileService = (data : FetchProfilePayload)=>{
    const {userName} = data;

    const user = User.findOne({userName});

    if(!user){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "User Not found",
        );
    }

    return user;
}