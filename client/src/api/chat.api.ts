import api from "./axios"

export const getContactsAPI = ()=>{
    return api.get("/chat/contacts");
}

export const fetchMessagesAPI = (data:any)=>{
    return api.post("/chat/fetchMessages", data);
}