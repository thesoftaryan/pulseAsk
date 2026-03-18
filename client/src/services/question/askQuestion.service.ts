import { askQuestionAPI } from "../../api/question.api"
import type { AskQuestionPayload } from "../../types/ApiRequest/question.type";


export const askQuestionService = (data : AskQuestionPayload)=>{
    return askQuestionAPI(data);
}