// Backend Api
import { verifyEmailAPI } from "../../../api/auth.api";

// Types
import type { VerifyEmailFormData } from "../../../types/auth";

// Reponse Parser
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";

// Toast
import { showToast } from "../../../utils/toast.util";


export const verifyEmailHandler = async (data : VerifyEmailFormData)=>{
    try{
        const response = await verifyEmailAPI(data);
        const parsedResponse = parseSuccessResponse(response);
        showToast.success(parsedResponse.message);
    }catch(error){
        const parsedResponse = parseErrorResponse(error);
        showToast.error(parsedResponse.message);
    }
}