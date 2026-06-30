import type { SearchPayload } from "../types/ApiRequest/search.type";
import api from "./axios"


export const getQASearchResultAPI = (data : SearchPayload)=>{
    return api.post("/search/qa", data);
}

export const getPeopleSearchResultAPI = (data: SearchPayload)=>{
    return api.post("/search/people", data);
}