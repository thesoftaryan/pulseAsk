import { updateChatProfileAPI } from "../../api/setting.api";
import type { UpdateChatProfilePayload } from "../../types/ApiRequest/setting.type";

export const updateChatProfileService = (data : UpdateChatProfilePayload)=>{
    return updateChatProfileAPI(data);
}