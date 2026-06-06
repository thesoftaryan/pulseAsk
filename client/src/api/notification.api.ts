import api from "./axios";

export const fetchNotificationsAPI = ()=>{
    return api.get("/notification/");
}

export const markNotificationAsSeenAPI = (data : any)=>{
    return api.post("/notification/markAsSeen", data);
}