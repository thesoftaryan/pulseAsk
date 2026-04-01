import { removeUserProfileImageAPI, addKTagAPI, removeKTagAPI, updateBasicProfileAPI, updateSocialProfileAPI, updateUserProfileImageAPI } from "../../api/setting.api";
import type { AddKTagPayload, RemoveKTagPayload, UpdateBasicProfilePayload, UpdateSocialProfilePayload, UpdateUserProfileImagePayload } from "../../types/ApiRequest/setting.type";

export const removeUserProfileImageService = ()=>{
    return removeUserProfileImageAPI();
}

export const updateUserProfileImageService = (data : UpdateUserProfileImagePayload)=>{
    return updateUserProfileImageAPI(data);
}

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