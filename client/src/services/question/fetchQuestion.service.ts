import { fetchQuestionAPI } from "../../api/question.api";

export const fetchQuestionService = (qid:string)=>{
    return fetchQuestionAPI(qid);
}