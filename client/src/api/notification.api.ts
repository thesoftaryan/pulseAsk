import api from "./axios";

export const fetchNotificationsAPI = ()=>{
    return api.get("/notification/");
}