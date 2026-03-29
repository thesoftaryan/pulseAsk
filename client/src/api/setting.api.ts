import type { UpdateBasicProfilePayload, UpdateSocialProfilePayload } from "../types/ApiRequest/setting.type";
import api from "./axios";


export const UpdateBasicProfileAPI = (data : UpdateBasicProfilePayload)=>{
    return api.post("/profile/update/basic", data);
}

export const UpdateSocialProfileAPI = (data : UpdateSocialProfilePayload)=>{
    return api.post("/profile/update/social", data);
}