import { Types } from "mongoose"
import { Bookmark } from "../models/Bookmark.model"
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes.constants";


export const addBookmarkService = async (uid: Types.ObjectId, data: any)=>{
    const {type, targetId} = data;
    // console.log("type: ", type, ", targetId: ", targetId);
    const bookmark = await Bookmark.findOne({
        userId: uid,
        targetId,
    })
    if(bookmark){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Bookmark already added",
        );
    }
    await Bookmark.create({
        userId: uid,
        type,
        targetId,
    });
}

export const removeBookmarkService = async (uid: Types.ObjectId, data : any)=>{
    const {type, targetId} = data;
    await Bookmark.deleteOne({
        userId: uid,
        type,
        targetId,
    });
}

export const isBookmarkedService = async (uid:Types.ObjectId, data : any)=>{
    const {type, targetId} = data;
    const bookmark = await Bookmark.findOne({
        userId:uid,
        type,
        targetId,
    });
    if(!bookmark) return false;
    return true;
}


/**
 * @param uid of type Types.Object Id
 * @returns list of answers bookmarked by user with given uid
 */
export const fetchBookmarkedAnswersService = async (uid: Types.ObjectId)=>{
    const answers = await Bookmark.find({
        userId: uid,
        type: "answer"
    });
    return answers;
}


/**
 * 
 * @param uid of type Types.Object Id
 * @returns list of questions bookmarked by user with given uid
 */
export const fetchBookmarkedQuestionsService = async (uid: Types.ObjectId)=>{
    const questions = await Bookmark.find({
        userId: uid,
        type: "question"
    });
    return questions;
}