import type { FetchMessagesPayload, GetUserContactDetailsPayload, MarkAsSeenPayload } from "../types/ApiRequest/chat.type";
import api from "./axios"

export const getContactsAPI = ()=>{
    return api.get("/chat/contacts");
}

export const getUserContactDetailsAPI = (data : GetUserContactDetailsPayload)=>{
    return api.post("/chat/userContactDetails", data);
}

export const fetchMessagesAPI = (data:FetchMessagesPayload)=>{
    return api.post("/chat/fetchMessages", data);
}

export const markAsSeenAPI = (data : MarkAsSeenPayload)=>{
    return api.post("/chat/markAsSeen", data);
}