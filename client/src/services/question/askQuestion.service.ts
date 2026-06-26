import { askQuestionAPI, quickAskQuestionAPI } from "../../api/question.api"
import type { AskQuestionPayload } from "../../types/ApiRequest/question.type";


export const askQuestionService = (data : AskQuestionPayload)=>{
    return askQuestionAPI(data);
}

export const quickAskQuestionService = (data : any)=>{
    return quickAskQuestionAPI(data);
}