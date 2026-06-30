import { getPeopleSearchResultAPI, getQASearchResultAPI } from "../api/search.api"
import type { SearchPayload } from "../types/ApiRequest/search.type";

export const getQASearchResultService = (data : SearchPayload)=>{
    return getQASearchResultAPI(data);
}

export const getPeopleSearchResultService = (data : SearchPayload)=>{
    return getPeopleSearchResultAPI(data);
}