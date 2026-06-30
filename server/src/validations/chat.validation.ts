import { Types } from "mongoose";
import { FetchMessagesPayload, GetUserContactDetailsPayload, MarkAsSeenPayload, SendMessagePayload } from "../types/chat.type";

export const validateUserContactDetails = (body : GetUserContactDetailsPayload)=>{
    const errors:Record<string, string> = {};

    const {userId} = body;

    if(!userId){
        errors.userId="userId is required";
    }else if(!Types.ObjectId.isValid(userId)){
        errors.userId = "userId is not valid";
    }
    return errors;
}

export const validateFetchMessages = (body : FetchMessagesPayload)=>{
    const errors:Record<string, string> = {};

    const {conversationId} = body;

    if(!conversationId){
        errors.conversationId="conversationId is required";
    }else if(!Types.ObjectId.isValid(conversationId)){
        errors.conversationId = "conversationId is not valid";
    }
    return errors;
}

export const validateMarkAsSeen = (body : MarkAsSeenPayload)=>{
    const errors:Record<string, string> = {};

    const {conversationId} = body;

    if(!conversationId){
        errors.conversationId="conversationId is required";
    }else if(!Types.ObjectId.isValid(conversationId)){
        errors.conversationId = "conversationId is not valid";
    }
    return errors;
}

export const validateCreateChatMessage = (body : SendMessagePayload)=>{
    const errors:Record<string, string> = {};

    const {senderId, receiverId, content, type} = body;

    if(!senderId){
        errors.senderId="senderId is required";
    }else if(!Types.ObjectId.isValid(senderId)){
        errors.senderId = "senderId is not valid";
    }else if(!receiverId){
        errors.receiverId="receiverId is required";
    }else if(!Types.ObjectId.isValid(receiverId)){
        errors.receiverId = "receiverId is not valid";
    }else if(!content){
        errors.content = "content is required";
    }else if(!type){
        errors.type = "type is required to be image or text";
    }
    return errors;
}