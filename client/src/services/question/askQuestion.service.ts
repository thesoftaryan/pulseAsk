import { askQuestionAPI } from "../../api/question.api"
import type { QuestionInterface } from "../../types/ApiResponse/question.type";


export const askQuestionService = (data : Partial<QuestionInterface>)=>{
    return askQuestionAPI(data);
}