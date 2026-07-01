import type { FetchQuestionsByTagPayload, FetchTagPayload, GenerateTagPayload } from "../types/ApiRequest/tag.type";
import api from "./axios";

export const generateTagAPI = (data : GenerateTagPayload)=>{
    return api.post("/tag/generate", data);
}

export const fetchQuestionsByTagAPI = (data : FetchQuestionsByTagPayload)=>{
    return api.post("/tag/fetchQuestions", data);
}

export const fetchTagBySlugAPI = (data : FetchTagPayload)=>{
    return api.post("/tag/fetchTag", data);
}

