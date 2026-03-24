import { getHomeMessageAPI } from "../../api/home.api";
import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service";
import { fetchQuestionsService } from "../../services/question/fetchQuestion.service";
import type { QuestionInterface } from "../../types/ApiResponse/question.type";
import { showToast } from "../../utils/toast.util";


export const useHomeHandler = ()=>{

    const homeHandler = async ( setBackendMessage : React.Dispatch<React.SetStateAction<string>>)=>{
        try{
            // console.log("calling api");
            const response = await getHomeMessageAPI();
            console.log(response);
            const parsed = parseSuccessResponse(response);
            setBackendMessage(parsed.message);
        }catch(error){
            const parsed = parseErrorResponse(error);
            setBackendMessage(parsed.message);
        }
    }

    const fetchQuestionsHandler = async (
        setQuestions: React.Dispatch<React.SetStateAction<QuestionInterface[]>>
    ) => {
        try{
            // console.log("calling api");
            const response = await fetchQuestionsService();
            const result = parseSuccessResponse<QuestionInterface[]>(response);
            setQuestions(result.data!);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    return {
        homeHandler,
        fetchQuestionsHandler,
    };
}