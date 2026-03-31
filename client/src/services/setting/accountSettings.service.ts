import { addKTagAPI, removeKTagAPI, updateBasicProfileAPI, updateSocialProfileAPI } from "../../api/setting.api";
import type { AddKTagPayload, RemoveKTagPayload, UpdateBasicProfilePayload, UpdateSocialProfilePayload } from "../../types/ApiRequest/setting.type";

export const updateBasicProfileService = (data : UpdateBasicProfilePayload)=>{
    return updateBasicProfileAPI(data);
}

export const updateSocialProfileService = (data : UpdateSocialProfilePayload)=>{
    return updateSocialProfileAPI(data);
}

export const addKTagService = (data : AddKTagPayload)=>{
    return addKTagAPI(data);
}

export const removeKTagService = (data : RemoveKTagPayload)=>{
    return removeKTagAPI(data);
}