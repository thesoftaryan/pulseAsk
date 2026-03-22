import { Query, Types } from "mongoose";
import { Answer } from "../models/Answer.model";
import { TargetType, Vote } from "../models/Vote.model";
import { VotePayload } from "../types/vote.type";
import { Question } from "../models/Question.model";
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes";
import { VoteResponse } from "../types/response/vote.type";

/**
 * @param data of form VotePayload
 * @returns updated vote count
 */
export const voteService = async (uid: Types.ObjectId, data : VotePayload, target: TargetType)=>{
    if(data.targetAuthor == uid){
        throw new ApiError(
            STATUS.CLIENT_ERROR.FORBIDDEN,
            "You can't vote yourself",
        );
    }
    const voteObj = {
        userId: uid,
        targetId: data.targetId,
        targetType: target,
        value: data.vote,
    };
    const vote = await Vote.findOne(voteObj);


    let voteCount=0;

    let newVote=data.vote as number;

    if(vote){
        if(data.vote == vote.value){
            newVote=0;
        }else{
            if(data.vote==1 && vote.value==-1){
                newVote = 2;
                vote.value = 1;
            }else{
                newVote = -2;
                vote.value = -1;
            }
        }
    }else{
        await Vote.create(voteObj);
    }


    if(target==="question"){
        await Question.updateOne(
            {_id: data.targetId},
            {$inc: {voteCount: newVote}},
        );
        const question = await Question.findById(data.targetId);
        if(!question){
            throw new ApiError(
                STATUS.CLIENT_ERROR.BAD_REQUEST,
                "Question not found",
            );
        }
        voteCount = (question.voteCount) as number;
    }else{
        await Answer.updateOne(
            {_id: data.targetId},
            {$inc: {voteCount: newVote}},
        );
        const answer = await Answer.findById(data.targetId);
        if(!answer){
            throw new ApiError(
                STATUS.CLIENT_ERROR.BAD_REQUEST,
                "Answer not found",
            );
        }
        voteCount = (answer.voteCount) as number;
    }

    await vote?.save();
    
    return voteCount;
}