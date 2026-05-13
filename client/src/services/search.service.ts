import { getPeopleSearchResultAPI, getQASearchResultAPI } from "../api/search.api"

export const getQASearchResultService = (data : any)=>{
    return getQASearchResultAPI(data);
}

export const getPeopleSearchResultService = (data : any)=>{
    return getPeopleSearchResultAPI(data);
}