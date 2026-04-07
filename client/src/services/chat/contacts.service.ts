import { getContactsAPI, getUserContactDetailsAPI } from "../../api/chat.api"


export const getContactsService = ()=>{
    return getContactsAPI();    
}

export const getUserContactDetailsService = (data : any)=>{
    return getUserContactDetailsAPI(data);
}