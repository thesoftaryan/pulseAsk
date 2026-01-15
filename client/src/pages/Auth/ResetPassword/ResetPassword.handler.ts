// Backend Api
import { resetPasswordAPI } from "../../../api/auth.api";

// Types
import type { ResetPasswordFormData } from "../../../types/auth";

// Reponse Parser
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";

// Toast
import { showToast } from "../../../utils/toast.util";

export const resetPasswordHandler = async (data : ResetPasswordFormData)=>{
    try{
        const response = await resetPasswordAPI(data);
        const parsedResponse = parseSuccessResponse(response);
        showToast.success(parsedResponse.message);
    }catch(error){
        const parsedResponse = parseErrorResponse(error);
        showToast.error(parsedResponse.message);
    }
}