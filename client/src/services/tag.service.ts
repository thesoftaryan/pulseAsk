import { fetchQuestionsByTagAPI, fetchTagBySlugAPI, generateTagAPI } from "../api/tag.api";
import type { FetchQuestionsByTagPayload, FetchTagPayload, GenerateTagPayload } from "../types/ApiRequest/tag.type";

export const generateTagService = async ( data : GenerateTagPayload )=>{
    return generateTagAPI(data);
}

export const fetchQuestionsByTagService = async (data : FetchQuestionsByTagPayload)=>{
    return fetchQuestionsByTagAPI(data);
}

export const fetchTagBySlugService = async (data : FetchTagPayload)=>{
    return fetchTagBySlugAPI(data);
}