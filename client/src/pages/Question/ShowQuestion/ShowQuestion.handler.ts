import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import { fetchQuestionService } from "../../../services/question/fetchQuestion.service";
import type { QuestionInterface } from "../../../types/ApiResponse/question.type";
import { showToast } from "../../../utils/toast.util";
// import { showToast } from "../../../utils/toast.util";


export const useShowQuestionHandler = (
    setQuestion : React.Dispatch<React.SetStateAction<QuestionInterface>>,
)=>{

    const fetchQuestionHandler = async (qid:string)=>{
        try{
            const response = await fetchQuestionService(qid);
            const result = parseSuccessResponse<QuestionInterface>(response);
            setQuestion(result.data!);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    return {
        fetchQuestionHandler,
    }

}