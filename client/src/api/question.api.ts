import type { AskQuestionPayload, FetchQuestionPayload } from "../types/ApiRequest/question.type";
import api from "./axios"


export const askQuestionAPI = (data : AskQuestionPayload)=>{
    return api.post("/question/ask", data);
}

export const fetchQuestionAPI = (data : FetchQuestionPayload)=>{
    return api.post("question/fetch", data);
}