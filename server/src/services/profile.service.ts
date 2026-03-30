import { Collection, Types } from "mongoose";
import { STATUS } from "../constants/statusCodes";
import { Answer } from "../models/Answer.model";
import { Question } from "../models/Question.model";
import { User } from "../models/User.model";
import { FetchProfilePayload, UpdateBasicProfilePayload, UpdateSocialProfilePayload } from "../types/profile.type";
import { FetchProfileResponse, UpdateBasicProfileResponse, UpdateSocialProfileResponse } from "../types/response/profile.type";
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
        {path:"author", select:"_id userName firstName lastName profile reputationScore"},
        {path:"bestAnswer"},
    ]);
    const answers = await Answer.find({author: user._id}).populate([
        {path: "author", select:"_id userName firstName lastName profile college"},
        {path: "qid", select:"_id slug"},
    ]);

    const responseObj = {
        user,
        questions,
        answers,
    }

    return responseObj;
}


/**
 * @param data of type UpdateBasicProfilePayload
 * @returns updated data of type UpdateBasicProfileResponse
 */
export const updateBasicProfileService = async (uid:Types.ObjectId ,data : UpdateBasicProfilePayload):Promise<UpdateBasicProfileResponse>=>{
    const duplicate = await User.findOne({userName: data.userName});
    if(duplicate && (duplicate._id != uid)){
        // !== won't work because type of _id is object and type of uid is string
        // console.log(typeof(duplicate._id), ", ", typeof(uid));
        throw new ApiError(
            STATUS.CLIENT_ERROR.CONFLICT,
            "Username already taken",
        );
    }
    
    await User.updateOne({_id:uid}, data);
    // const user = await User.findById(uid);
    // const updatedDetails = {
    //     userName: user!.userName,
    //     firstName: user!.firstName,
    //     lastName: user!.lastName,
    //     degree: user!.degree??"",
    //     college: user!.college??"",
    //     descriptionHTML: user!.descriptionHTML??"",
    //     descriptionJSON: user!.descriptionJSON??"",
    // };
    return data;
}

/**
 * @param data of type UpdateSocialProfilePayload
 * @returns updated data of type UpdateSocialProfileResponse
 */
export const updateSocialProfileService = async (uid:Types.ObjectId, data : UpdateSocialProfilePayload):Promise<UpdateSocialProfileResponse>=>{
    await User.updateOne({_id: uid}, data);
    return data;
}