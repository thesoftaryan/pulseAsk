import { fetchAnswerCommentsAPI, postAnswerCommentAPI } from "../../api/answer.api";
import type { FetchCommentsPayload, PostCommentPayload } from "../../types/ApiRequest/comment.type";

export const fetchAnswerCommentsService = (data : FetchCommentsPayload)=>{
    return fetchAnswerCommentsAPI(data);
}

export const postAnswerCommentService = (data:PostCommentPayload)=>{
    return postAnswerCommentAPI(data);
}