import { Query, Types } from "mongoose";
import { Answer } from "../models/Answer.model";
import { TargetType, Vote } from "../models/Vote.model";
import { VotePayload } from "../types/vote.type";
import { Question } from "../models/Question.model";
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes";
import { VoteResponse } from "../types/response/vote.type";
import { reputationPolicy } from "../utils/reputation.util";
import { User } from "../models/User.model";

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

    let reputationChange=0;
    let upvoteChange=0;
    let downvoteChange=0;
    const type = (target==="answer");
    if(vote){
        // console.log("vote val: ", vote.value);
        if(data.vote == vote.value){
            newVote=(data.vote==1)? -1:1;
            flag=true;
            if(data.vote===1){
                upvoteChange = -1;
                reputationChange = -((type)? reputationPolicy.answerUpvoted:reputationPolicy.questionUpvoted);
            }else{
                // user has removed his downvote
                downvoteChange = -1;
                reputationChange = -((type)? reputationPolicy.answerDownvoted:reputationPolicy.questionDownvoted);
            }
        }else{
            if(data.vote==1 && vote.value==-1){
                newVote = 2;
                vote.value = 1;

                upvoteChange = 1;
                downvoteChange = -1;

                reputationChange = 
                // reverting the downvote
                (-((type)? reputationPolicy.answerDownvoted:reputationPolicy.questionDownvoted)) 
                // Adding the value
                + ((type)? reputationPolicy.answerUpvoted:reputationPolicy.questionUpvoted);
            }else{
                newVote = -2;
                vote.value = -1;

                upvoteChange = -1;
                downvoteChange = 1;

                reputationChange = 
                // reverting the upvote
                - ((type)? reputationPolicy.answerUpvoted:reputationPolicy.questionUpvoted)
                // adding the downvote
                +((type)? reputationPolicy.answerDownvoted:reputationPolicy.questionDownvoted);
            }
        }
    }else{
        if(data.vote===1){
            upvoteChange = 1;
            reputationChange = ((type)? reputationPolicy.answerUpvoted:reputationPolicy.questionUpvoted);
        }else{
            downvoteChange = 1;
            reputationChange = ((type)? reputationPolicy.answerDownvoted:reputationPolicy.questionDownvoted);
        }
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

    await User.updateOne({_id: data.targetAuthor}, 
      {$inc: 
        {
            reputationScore: reputationChange,
            upvotes: upvoteChange,
            downvotes: downvoteChange,
        }
      }
    );
    
    return voteCount;
}