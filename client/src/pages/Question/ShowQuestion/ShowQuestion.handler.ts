import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../routes/routesConstants";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import { fetchQuestionService } from "../../../services/question/fetchQuestion.service";
import type { VotePayload, VoteType } from "../../../types/ApiRequest/vote.type";
import type { QuestionInterface } from "../../../types/ApiResponse/question.type";
import type { VoteResponse } from "../../../types/ApiResponse/vote.type";
import { showToast } from "../../../utils/toast.util";
// import { showToast } from "../../../utils/toast.util";


export const useShowQuestionHandler = (
    setQuestion : React.Dispatch<React.SetStateAction<QuestionInterface>>,
)=>{
    const {replaceNavigate} = useSafeNavigate();
    const fetchQuestionHandler = async (qid:string, slug:string)=>{
        try{
            // console.log(qid);
            const response = await fetchQuestionService({qid});
            const result = parseSuccessResponse<QuestionInterface>(response);
            console.log(result);
            if(result.data?.slug !== slug){
                replaceNavigate(homeRoutes.question+`/${qid}/${result.data?.slug}`);
            }
            setQuestion(result.data!);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
            replaceNavigate(homeRoutes.home);
        }
    }

    const voteQuestionHandler = async (vote: VoteType, targetId: string, targetAuthor:string)=>{
        try{
            const voteObj:VotePayload = {
                targetId,
                targetAuthor,
                vote,
            }
            const response = await voteQuestionService(voteObj);
            const result = parseSuccessResponse<VoteResponse>(response);
            setQuestion(
                (state)=>
                {
                    return {
                        ...state,
                        voteCount: result.data?.voteCount??0,
                    };
                }
            );
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    return {
        fetchQuestionHandler,
        voteQuestionHandler,
    }

}