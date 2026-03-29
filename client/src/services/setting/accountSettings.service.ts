import { UpdateBasicProfileAPI, UpdateSocialProfileAPI } from "../../api/setting.api";
import type { UpdateBasicProfilePayload, UpdateSocialProfilePayload } from "../../types/ApiRequest/setting.type";

export const updateBasicProfileService = (data : UpdateBasicProfilePayload)=>{
    return UpdateBasicProfileAPI(data);
}

export const updateSocialProfileService = (data : UpdateSocialProfilePayload)=>{
    return UpdateSocialProfileAPI(data);
}