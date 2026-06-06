import { fetchNotificationsAPI, markNotificationAsSeenAPI } from "../api/notification.api"

export const fetchNotificationsService = ()=>{
    return fetchNotificationsAPI();
}

export const markNotificationAsSeenService = (data : any)=>{
    return markNotificationAsSeenAPI(data);
}