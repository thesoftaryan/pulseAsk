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
    if(!(Types.ObjectId.isValid(data.targetId))){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            `${target==="answer"? "Answer":"Question"} not found`,
        );
    }
    
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
    };
    const vote = await Vote.findOne(voteObj);


    let voteCount=0;

    let newVote=data.vote as number;
    let flag=false;
    if(vote){
        // console.log("vote val: ", vote.value);
        if(data.vote == vote.value){
            newVote=(data.vote==1)? -1:1;
            flag=true;
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
        await Vote.create({...voteObj, value:newVote});
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
        // console.log("new vote: ", question.voteCount);
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

    if(flag){
        await Vote.deleteOne({_id: vote?.id});
    }else{
        await vote?.save();
    }
    
    return voteCount;
}