import { voteAnswerAPI } from "../../api/answer.api"
import type { VotePayload } from "../../types/ApiRequest/vote.type";


export const voteAnswerService = (data: VotePayload)=>{
    return voteAnswerAPI(data);
}