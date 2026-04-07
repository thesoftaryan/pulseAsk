import api from "./axios"

export const getContactsAPI = ()=>{
    return api.get("/chat/contacts");
}

export const getUserContactDetailsAPI = (data : any)=>{
    return api.post("/chat/userContactDetails", data);
}

export const fetchMessagesAPI = (data:any)=>{
    return api.post("/chat/fetchMessages", data);
}