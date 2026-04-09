import { fetchMessagesAPI } from "../../api/chat.api"
import type { FetchMessagesPayload } from "../../types/ApiRequest/chat.type";


export const fetchMessagesService = (data : FetchMessagesPayload)=>{
    return fetchMessagesAPI(data);
}