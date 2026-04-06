import { fetchMessagesAPI } from "../../api/chat.api"


export const fetchMessagesService = (data : any)=>{
    return fetchMessagesAPI(data);
}