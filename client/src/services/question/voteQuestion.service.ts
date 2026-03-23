import { voteQuestionAPI } from "../../api/question.api"
import type { VotePayload } from "../../types/ApiRequest/vote.type"

export const voteQuestionService = (data : VotePayload)=>{
    return voteQuestionAPI(data);
}