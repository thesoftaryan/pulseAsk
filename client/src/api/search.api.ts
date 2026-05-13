import api from "./axios"


export const getQASearchResultAPI = (data : any)=>{
    return api.post("/search/qa", data);
}

export const getPeopleSearchResultAPI = (data:any)=>{
    return api.post("/search/people", data);
}