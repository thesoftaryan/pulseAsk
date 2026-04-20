import { fetchQuestionsByTagAPI, generateTagAPI } from "../api/tag.api";
import type { GenerateTagPayload } from "../types/ApiRequest/tag.type";

export const generateTagService = async ( data : GenerateTagPayload )=>{
    return generateTagAPI(data);
}

export const fetchQuestionsByTagService = async (data : any)=>{
    return fetchQuestionsByTagAPI(data);
}