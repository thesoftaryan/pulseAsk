import { fetchProfileAPI } from "../../api/profile.api"
import type { FetchProfilePayload } from "../../types/ApiRequest/profile.type";

export const fetchProfileService = (data:FetchProfilePayload)=>{
    return fetchProfileAPI(data);
}