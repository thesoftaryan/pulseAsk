import { useAppSelector } from "../../../hooks/store.hook";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../routes/routesConstants";
import { fetchAnswersService } from "../../../services/answer/fetchAnswers.service";
import { postAnswerService } from "../../../services/answer/postAnswer.service";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import { fetchQuestionService } from "../../../services/question/fetchQuestion.service";
import { voteQuestionService } from "../../../services/question/voteQuestion.service";
import type { FetchAnswersPayload, PostAnswerPayload } from "../../../types/ApiRequest/answer.type";
import type { VotePayload, VoteType } from "../../../types/ApiRequest/vote.type";
import type { AnswerInterface, FetchAnswersResponse, PostAnswerResponse } from "../../../types/ApiResponse/answer.type";
import type { QuestionInterface } from "../../../types/ApiResponse/question.type";
import type { VoteResponse } from "../../../types/ApiResponse/vote.type";
import { showToast } from "../../../utils/toast.util";
// import { showToast } from "../../../utils/toast.util";


export const useShowQuestionHandler = (
    setQuestion : React.Dispatch<React.SetStateAction<QuestionInterface>>,
    setAnswers : React.Dispatch<React.SetStateAction<AnswerInterface[]>>,
)=>{
    const auth = useAppSelector(state=>state.auth);
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

    const fetchAnswersHandler = async (data : FetchAnswersPayload)=>{
        try{
            const response = await fetchAnswersService(data);
            const result = parseSuccessResponse<FetchAnswersResponse>(response);
            console.log(result.data?.answers);
            setAnswers(result.data!.answers)
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    const postAnswerHandler = async (data:PostAnswerPayload)=>{
        try{
            const response = await postAnswerService(data);
            const result = parseSuccessResponse<PostAnswerResponse>(response);
            showToast.success(result.message);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    const voteQuestionHandler = async (
        vote: VoteType, 
        targetId: string, 
        targetAuthor:string,
        setVoting: React.Dispatch<React.SetStateAction<boolean>>,
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
        }finally{
            setVoting(false);
        }
    }


    return {
        fetchQuestionHandler,
        fetchAnswersHandler,
        postAnswerHandler,
        voteQuestionHandler,
    }

}