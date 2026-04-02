import { updateNotificationProfileAPI } from "../../api/setting.api";
import type { UpdateNotificationProfilePayload } from "../../types/ApiRequest/setting.type";

export const updateNotificationProfileService = (data : UpdateNotificationProfilePayload)=>{
    return updateNotificationProfileAPI(data);
}