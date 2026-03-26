import { Types } from "mongoose";
import { PostAnswerPayload } from "../types/answer.type";
import { FetchCommentsPayload, PostCommentPayload } from "../types/comment.type";

export const validateFetchComments = (body : FetchCommentsPayload)=>{
    const errors:Record<string, string> = {};
    if(!body || typeof(body)!=="object"){
        errors.body = "Request body is required";
        return errors;
    }

    const {targetId} = body;

    if(!targetId){
        errors.targetId="targetId id is required";
    }
    return errors;
}

export const validatePostComment = (body : PostCommentPayload)=>{
    const errors:Record<string, string> = {};
    if(!body || typeof(body)!=="object"){
        errors.body = "Request body is required";
        return errors;
    }

    const {targetId, content} = body;

    if(!targetId){
        errors.targetId = "targetId id is required";
    }else if(!content || content.length < 5){
        errors.content = "content is required to be of atleast 5 characters";
    }
    return errors;
}
