import { fetchNotificationsAPI } from "../api/notification.api"

export const fetchNotificationsService = ()=>{
    return fetchNotificationsAPI();
}