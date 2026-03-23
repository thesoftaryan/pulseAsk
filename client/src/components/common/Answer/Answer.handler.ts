import { useAppSelector } from "../../../hooks/store.hook";
import { voteAnswerService } from "../../../services/answer/voteAnswer.service";
import type { VotePayload, VoteType } from "../../../types/ApiRequest/vote.type"
import { showToast } from "../../../utils/toast.util";
import type { VoteResponse } from "../../../types/ApiResponse/vote.type";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";



export const useAnswerHandler = (
    setVoting: React.Dispatch<React.SetStateAction<boolean>>,
    setVoteCount: React.Dispatch<React.SetStateAction<number>>,
)=>{

    const auth = useAppSelector(state=>state.auth);

    const voteAnswerHandler = async (
        vote: VoteType, 
        targetId: string, 
        targetAuthor:string,
    )=>{


        try{
            if(targetAuthor === auth.user?._id){
                showToast.error("You can't vote on yourself");
                return;
            }
            const voteObj:VotePayload = {
                targetId,
                targetAuthor,
                vote,
            }
            setVoting(true);
            const response = await voteAnswerService(voteObj);
            const result = parseSuccessResponse<VoteResponse>(response);
            setVoteCount(result.data?.voteCount??0);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setVoting(false);
        }
    }

    return {
        voteAnswerHandler,
    }
}