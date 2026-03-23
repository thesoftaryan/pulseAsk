import { postAnswerAPI } from "../../api/answer.api";
import type { PostAnswerPayload } from "../../types/ApiRequest/answer.type";


export const postAnswerService = (data:PostAnswerPayload)=>{
    return postAnswerAPI(data);
}