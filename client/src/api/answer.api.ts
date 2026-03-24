import type { FetchAnswersPayload, PostAnswerPayload } from "../types/ApiRequest/answer.type";
import type { FetchCommentsPayload, PostCommentPayload } from "../types/ApiRequest/comment.type";
import type { VotePayload } from "../types/ApiRequest/vote.type";
import api from "./axios";

export const fetchAnswersAPI = (data : FetchAnswersPayload)=>{
    return api.post("answer/fetch", data);
}

export const postAnswerAPI = (data : PostAnswerPayload)=>{
    return api.post("answer/post", data);
}

export const voteAnswerAPI = (data : VotePayload)=>{
    return api.post("/answer/vote", data);
}

export const fetchAnswerCommentsAPI = (data : FetchCommentsPayload)=>{
    return api.post("answer/comment/fetch", data);
}

export const postAnswerCommentAPI = (data : PostCommentPayload)=>{
    return api.post("answer/comment/post", data);
}