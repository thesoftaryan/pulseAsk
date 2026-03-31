import type { AddKTagPayload, RemoveKTagPayload, UpdateBasicProfilePayload, UpdateSocialProfilePayload } from "../types/ApiRequest/setting.type";
import api from "./axios";


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