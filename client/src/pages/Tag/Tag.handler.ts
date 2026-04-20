import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service"
import { fetchQuestionsByTagService } from "../../services/tag.service";
import { showToast } from "../../utils/toast.util";


export const useTagHandler = (
    setQuestions: React.Dispatch<any>,
)=>{

    const fetchQuestions = async (slug:string)=>{
        try{
            const response = await fetchQuestionsByTagService({slug});
            const result = parseSuccessResponse<any>(response);
            setQuestions(result.data);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    return {
        fetchQuestions,
    }

}