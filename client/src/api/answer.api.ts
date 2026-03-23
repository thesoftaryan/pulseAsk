import type { FetchAnswersPayload, PostAnswerPayload } from "../types/ApiRequest/answer.type";
import api from "./axios";

export const fetchAnswersAPI = (data : FetchAnswersPayload)=>{
    return api.post("answer/fetch", data);
}

export const postAnswerAPI = (data : PostAnswerPayload)=>{
    return api.post("answer/post", data);
}