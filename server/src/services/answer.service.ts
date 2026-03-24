import { Types } from "mongoose";
import { Answer, AnswerInterface } from "../models/Answer.model";
import { FetchAnswersPayload, PostAnswerPayload } from "../types/answer.type";
import { FetchCommentsPayload, PostCommentPayload } from "../types/comment.type";
import { Comment } from "../models/Comment.model";
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes";


/**
 * @param data of type PostAnswerPayload
 * @returns answer object of type AnswerInterface
 */
export const postAnswerService = async (author:Types.ObjectId, data : PostAnswerPayload)=>{
    const answerObj = {
        ...data,
        author,
        askedAt: Date.now(),
    };
    await Answer.create(answerObj);
}

/**
 * @param data of type FetchAnswersPayload
 * @returns array of answer objects for that particular question.
 */
export const fetchAnswersService = async (data : FetchAnswersPayload)=>{
    const answers = await Answer.find({qid: data.qid}).populate([
        {path: "author", select:"_id firstName lastName profile college"}
    ]);
    return answers;
}

/**
 * @param data of type FetchCommentsPayload
 * @returns array of comments for given answer
 */
export const fetchAnswerCommentsService = async (data : FetchCommentsPayload)=>{
    const comments = await Comment.find({answerId: data.targetId}).populate([
        {path:"author", select:"_id profile firstName lastName"},
    ]);
    return comments;
}

/**
 * @param data of type PostCommentsPayload
 * @returns nothing
 */
export const postAnswerCommentService = async (author:Types.ObjectId, data : PostCommentPayload)=>{
    const commentObj = {
        answerId: data.targetId,
        author,
        content: data.content,
        commentedAt: Date.now(),
    };
    try{
        await Comment.create(commentObj);
    }catch(error){
        throw new ApiError(
            STATUS.SERVER_ERROR.BAD_GATEWAY,
            "Comment failed, please try again",
        );
    }
}