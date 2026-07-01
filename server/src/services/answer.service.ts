import { Types } from "mongoose";
import { Answer, AnswerInterface } from "../models/Answer.model";
import { FetchAnswersPayload, PostAnswerPayload } from "../types/answer.type";
import { FetchCommentsPayload, PostCommentPayload } from "../types/comment.type";
import { Comment } from "../models/Comment.model";
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes.constants";
import { Question } from "../models/Question.model";
import { User } from "../models/User.model";
import { reputationPolicy } from "../constants/reputation.constants";
import { updateUserStatsService } from "./profile.service";
import { appEventEmitter } from "../emitter/emitter";
import { AnswerNotificationPayload } from "../types/notification.type";


/**
 * @param payload of type PostAnswerPayload
 * @returns answer object of type AnswerInterface
 */
export const postAnswerService = async (author:Types.ObjectId, payload : PostAnswerPayload)=>{
    if(!Types.ObjectId.isValid(payload.qid)){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "Question not found, it might be deleted",
        );
    }
    const answerObj = {
        ...payload,
        author,
        askedAt: Date.now(),
    };
    const answer = await Answer.create(answerObj);

    const question = await Question.findById(payload.qid).populate([
        {path: "author", select: "_id notificationPreferences"}
    ]);
    if(question){
        if(question.bestAnswer){
            const curr = await Answer.findById(question.bestAnswer);
            if(curr && curr.voteCount < 0){
                question.bestAnswer = answer._id;
            }
        }else{
            question.bestAnswer = answer._id;
        }
        await question.save();
    }

    
    await updateUserStatsService(author, {
        reputationChange: reputationPolicy.answerPosted,
        answersGivenChange: 1,
    });
    
    if(question?.author.notificationPreferences.answer){
        // console.log("sending answer notification to the user : ", question.author.firstName);
        const data : AnswerNotificationPayload = {
                senderId: author,
                receiverId: question?.author._id,
                answerId: answer._id,
                questionId: question?._id,
            };
        appEventEmitter.emit(
            "answer.created",
            data,
        );
    }
    
}

/**
 * @param payload of type FetchAnswersPayload
 * @returns array of answer objects for that particular question.
 */
export const fetchAnswersService = async (payload : FetchAnswersPayload)=>{
    if(!Types.ObjectId.isValid(payload.qid)){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "Question not found, it might be deleted",
        );
    }

    const answers = await Answer.find({qid: payload.qid}).populate([
        {path: "author", select:"_id userName firstName lastName profile college"},
        {path: "qid", select:"_id slug"},
    ]).sort(
        {voteCount: -1}
    );
    return answers;
}

/**
 * @param payload of type FetchCommentsPayload
 * @returns array of comments for given answer
 */
export const fetchAnswerCommentsService = async (payload : FetchCommentsPayload)=>{
    if(!Types.ObjectId.isValid(payload.targetId)){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "Answer not found, it might be deleted",
        );
    }
    const comments = await Comment.find({answerId: payload.targetId}).populate([
        {path:"author", select:"_id userName profile firstName lastName"},
    ]);
    return comments;
}

/**
 * @param payload of type PostCommentsPayload
 * @returns nothing
 */
export const postAnswerCommentService = async (author:Types.ObjectId, payload : PostCommentPayload)=>{
    const commentObj = {
        answerId: payload.targetId,
        author,
        content: payload.content,
        commentedAt: Date.now(),
    };
    if(!Types.ObjectId.isValid(payload.targetId)){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "Answer not found, it might be deleted",
        );
    }
    try{
        await Comment.create(commentObj);


        await updateUserStatsService(author, {
            reputationChange: reputationPolicy.commented,
        });


        // await User.updateOne({_id: author},{
        //     $inc: {reputationScore: reputationPolicy.commented}
        // });


    }catch(error){
        throw new ApiError(
            STATUS.SERVER_ERROR.BAD_GATEWAY,
            "Comment failed, please try again",
        );
    }
}