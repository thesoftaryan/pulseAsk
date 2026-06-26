import { useState } from "react";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../routes/routesConstants";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service"
import { quickAskQuestionService } from "../../../services/question/askQuestion.service";
import { showToast } from "../../../utils/toast.util";


export const useQuickAskHander = ()=>{
    
    const [asking, setAsking] = useState(false);
    const {safeNavigate} = useSafeNavigate();

    const askQuestionHandler = async (data : any)=>{
        try{
            setAsking(true);
            const response = await quickAskQuestionService(data);
            const result = parseSuccessResponse<any>(response);
            showToast.success(result.message);
            safeNavigate(homeRoutes.question+`/${result.data.qid}/${result.data.slug}`);
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
        }finally{
            setAsking(false);
        }
    }
    return {
        asking,
        askQuestionHandler,
    }
}