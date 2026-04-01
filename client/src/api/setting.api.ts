import type { AddKTagPayload, RemoveKTagPayload, UpdateBasicProfilePayload, UpdateSocialProfilePayload, UpdateUserProfileImagePayload } from "../types/ApiRequest/setting.type";
import api from "./axios";

export const removeUserProfileImageAPI = ()=>{
    return api.post("/settings/account/remove/image");
}

export const updateUserProfileImageAPI = (data : UpdateUserProfileImagePayload)=>{
    return api.post("/settings/account/update/image", data);
}

export const updateBasicProfileAPI = (data : UpdateBasicProfilePayload)=>{
    return api.post("/settings/account/update/basic", data);
}

export const updateSocialProfileAPI = (data : UpdateSocialProfilePayload)=>{
    return api.post("/settings/account/update/social", data);
}

export const addKTagAPI = (data : AddKTagPayload)=>{
    return api.post("/settings/account/k-tag/add", data);
}

export const removeKTagAPI = (data: RemoveKTagPayload)=>{
    return api.post("/settings/account/k-tag/remove", data);
}