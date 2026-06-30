import { Types } from "mongoose";
import { BookmarkPayload } from "../types/bookmarks.type";

export const validateBookmark = (body : BookmarkPayload)=>{
    const errors:Record<string, string> = {};


    const {type, targetId} = body;

    if(!type){
        errors.type="type is required";
    }else if(!targetId){
        errors.targetId = "targetId is required";
    }else if(!Types.ObjectId.isValid(targetId)){
        errors.targetId = "targetId is not valid";
    }
    return errors;
}