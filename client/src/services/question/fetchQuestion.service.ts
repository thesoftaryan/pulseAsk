import { fetchQuestionAPI, fetchQuestionsAPI } from "../../api/question.api";
import type { FetchQuestionPayload } from "../../types/ApiRequest/question.type";

export const fetchQuestionService = (data:FetchQuestionPayload)=>{
    return fetchQuestionAPI(data);
}

export const fetchQuestionsService = ()=>{
    return fetchQuestionsAPI();
}
