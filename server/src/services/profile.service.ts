import { STATUS } from "../constants/statusCodes";
import { Answer } from "../models/Answer.model";
import { Question } from "../models/Question.model";
import { User } from "../models/User.model";
import { FetchProfilePayload } from "../types/profile.type";
import { FetchProfileResponse } from "../types/response/profile.type";
import { ApiError } from "../utils/error.util";


/**
 * @param data of type FetchProfilePayload
 * @returns user of type UserInterface
 */
export const fetchProfileService = async (data : FetchProfilePayload) : Promise<FetchProfileResponse> =>{
    const {userName} = data;

    const user = await User.findOne({userName});

    if(!user){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "User Not found",
        );
    }

    const questions = await Question.find({author: user._id}).populate([
        {path:"tags"},
        {path:"author", select:"_id firstName lastName profile reputationScore"},
        {path:"bestAnswer"},
    ]);
    const answers = await Answer.find({author: user._id}).populate([
        {path: "author", select:"_id firstName lastName profile college"},
        {path: "qid", select:"_id slug"},
    ]);

    const responseObj = {
        user,
        questions,
        answers,
    }

    return responseObj;
}