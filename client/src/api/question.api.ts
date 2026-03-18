import type { AskQuestionPayload } from "../types/ApiRequest/question.type";
import api from "./axios"


export const askQuestionAPI = (data : AskQuestionPayload)=>{
    return api.post("/question/ask", data);
}