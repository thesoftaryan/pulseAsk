import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service";
import { fetchBookmarkedAnswersService, fetchBookmarkedQuestionsService } from "../../services/bookmarks.service";
import type { AnswerInterface } from "../../types/ApiResponse/answer.type";
import type { QuestionInterface } from "../../types/ApiResponse/question.type";
import { showToast } from "../../utils/toast.util";

export const useBookmarksHandler = (
    setQuestions : React.Dispatch<React.SetStateAction<QuestionInterface[]>>,
    setAnswers : React.Dispatch<React.SetStateAction<Partial<AnswerInterface>[]>>,
)=>{

    const fetchBookmarkedQuestions = async ()=>{
        try{
            const response = await fetchBookmarkedQuestionsService();
            const result = parseSuccessResponse<{questions:QuestionInterface[]}>(response);
            setQuestions(result.data!.questions);
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
        }
    }

    const fetchBookmarkedAnswers = async ()=>{
        try{
            const response = await fetchBookmarkedAnswersService();
            const result = parseSuccessResponse<{answers:Partial<AnswerInterface>[]}>(response);
            setAnswers(result.data!.answers);
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
        }
    }

    return {
        fetchBookmarkedQuestions,
        fetchBookmarkedAnswers,
    }
}