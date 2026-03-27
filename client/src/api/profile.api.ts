import type { FetchProfilePayload } from "../types/ApiRequest/profile.type";
import api from "./axios"


export const fetchProfileAPI = (data : FetchProfilePayload)=>{
    return api.post("/profile/fetch", data);
}