import type { GenerateTagPayload } from "../types/ApiRequest/tag.type";
import api from "./axios";

export const generateTagAPI = (data : GenerateTagPayload)=>{
    return api.post("/tag/generate", data);
}

export const fetchQuestionsByTagAPI = (data : any)=>{
    return api.post("/tag/fetchQuestions", data);
}