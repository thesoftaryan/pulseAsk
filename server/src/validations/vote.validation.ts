import { VotePayload } from "../types/vote.type";


// export interface VotePayload{
//     targetId: Types.ObjectId;
//     targetAuthor: Types.ObjectId;
//     vote: VoteType;
// }

export const validateVote = (body : VotePayload)=>{
    const errors:Record<string, string> = {};
    if(!body || typeof(body) !== "object"){
        errors.body = "request body is required";
        return errors;
    }

    const {targetId, targetAuthor, vote} = body;

    if(!targetId){
        errors.targetId = "targetId is required";
    }else if(!targetAuthor){
        errors.targetAuthor = "targetAuthor is required";
    }else if(!vote){
        errors.vote = "vote is required";
    }else if(vote!=1 && vote!=-1){
        errors.vote = "vote can either be 1 or -1";
    }
    return errors;
}