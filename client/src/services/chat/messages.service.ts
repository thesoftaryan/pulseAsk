import { fetchMessagesAPI, markAsSeenAPI } from "../../api/chat.api"
import type { FetchMessagesPayload, MarkAsSeenPayload } from "../../types/ApiRequest/chat.type";


export const fetchMessagesService = (data : FetchMessagesPayload)=>{
    return fetchMessagesAPI(data);
}

export const markAsSeenService = (data : MarkAsSeenPayload)=>{
    return markAsSeenAPI(data);
}