import { getContactsAPI, getUserContactDetailsAPI } from "../../api/chat.api"
import type { GetUserContactDetailsPayload } from "../../types/ApiRequest/chat.type";


export const getContactsService = ()=>{
    return getContactsAPI();    
}

export const getUserContactDetailsService = (data : GetUserContactDetailsPayload)=>{
    return getUserContactDetailsAPI(data);
}