import { Types } from "mongoose";
import { Answer, AnswerInterface } from "../models/Answer.model";
import { FetchAnswersPayload, PostAnswerPayload } from "../types/answer.type";
import { FetchCommentsPayload, PostCommentPayload } from "../types/comment.type";
import { Comment } from "../models/Comment.model";
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes";
import { Question } from "../models/Question.model";
import { User } from "../models/User.model";
import { reputationPolicy } from "../utils/reputation.util";


/**
 * @param data of type PostAnswerPayload
 * @returns answer object of type AnswerInterface
 */
export const postAnswerService = async (author:Types.ObjectId, data : PostAnswerPayload)=>{
    if(!Types.ObjectId.isValid(data.qid)){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "Question not found, it might be deleted",
        );
    }
    const answerObj = {
        ...data,
        author,
        askedAt: Date.now(),
    };
    await Answer.create(answerObj);
    await User.updateOne({_id: author},{
        $inc: {
            reputationScore: reputationPolicy.answerPosted,
            answersGiven: 1,
        }
    });
}

/**
 * @param data of type FetchAnswersPayload
 * @returns array of answer objects for that particular question.
 */
export const fetchAnswersService = async (data : FetchAnswersPayload)=>{
    if(!Types.ObjectId.isValid(data.qid)){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "Question not found, it might be deleted",
        );
    }

    const answers = await Answer.find({qid: data.qid}).populate([
        {path: "author", select:"_id userName firstName lastName profile college"},
        {path: "qid", select:"_id slug"},
    ]);
    return answers;
}

/**
 * @param data of type FetchCommentsPayload
 * @returns array of comments for given answer
 */
export const fetchAnswerCommentsService = async (data : FetchCommentsPayload)=>{
    if(!Types.ObjectId.isValid(data.targetId)){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "Answer not found, it might be deleted",
        );
    }
    const comments = await Comment.find({answerId: data.targetId}).populate([
        {path:"author", select:"_id userName profile firstName lastName"},
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
    if(!Types.ObjectId.isValid(data.targetId)){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "Answer not found, it might be deleted",
        );
    }
    try{
        await Comment.create(commentObj);
        await User.updateOne({_id: author},{
            $inc: {reputationScore: reputationPolicy.commented}
        });
    }catch(error){
        throw new ApiError(
            STATUS.SERVER_ERROR.BAD_GATEWAY,
            "Comment failed, please try again",
        );
    }
}