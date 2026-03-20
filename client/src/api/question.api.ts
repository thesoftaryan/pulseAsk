import type { AskQuestionPayload } from "../types/ApiRequest/question.type";
import api from "./axios"


export const askQuestionAPI = (data : AskQuestionPayload)=>{
    return api.post("/question/ask", data);
}

export const fetchQuestionAPI = (qid : string)=>{
    return api.post("question/fetch", qid);
}