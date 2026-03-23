import type { AskQuestionPayload, FetchQuestionPayload } from "../types/ApiRequest/question.type";
import type { VotePayload } from "../types/ApiRequest/vote.type";
import api from "./axios"


export const askQuestionAPI = (data : AskQuestionPayload)=>{
    return api.post("/question/ask", data);
}

export const fetchQuestionAPI = (data : FetchQuestionPayload)=>{
    return api.post("question/fetch", data);
}

export const voteQuestionAPI = (data : VotePayload)=>{
    return api.post("question/vote", data);
}