import { Types } from "mongoose"
import { Bookmark } from "../models/Bookmark.model"
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes.constants";
import { AnswerInterface } from "../models/Answer.model";
import { populate } from "dotenv";


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
    const bookmarks = await Bookmark.find({
        userId: uid,
        type: "answer"
    }).populate([
        {
            path:"targetId",
            model: "Answer",
            populate:[
                {path: "author", select:"_id userName profile firstName lastName college"},
                {path: "qid", select:"_id slug"},
            ]
        }
    ]);
    let answers=[];
    for(let elem of bookmarks){
        answers.push(elem.targetId);
    }
    return answers;
}


/**
 * 
 * @param uid of type Types.Object Id
 * @returns list of questions bookmarked by user with given uid
 */
export const fetchBookmarkedQuestionsService = async (uid: Types.ObjectId)=>{
    const bookmarks = await Bookmark.find({
        userId: uid,
        type: "question"
    }).populate([
        {
            path:"targetId",
            model: "Question",
            populate:[
                {path: "author", select:"_id userName profile firstName lastName college"},
                {
                    path: "bestAnswer",
                    populate:[
                        {path: "author", select:"_id userName profile firstName lastName college"},
                    ]
                },
                {path: "tags"}
            ]
        }
    ]);
    let questions=[];
    for(let elem of bookmarks){
        questions.push(elem.targetId);
    }
    return questions;
}