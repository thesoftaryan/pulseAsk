import type { QuestionInterface } from "../types/ApiResponse/question.type";
import api from "./axios"


export const askQuestionAPI = (data : Partial<QuestionInterface>)=>{
    return api.post("/question/ask", data);
}