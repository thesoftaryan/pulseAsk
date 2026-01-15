// Backend Api
import { forgotPasswordAPI } from "../../../api/auth.api";

// Types
import type { ForgotPasswordFormData } from "../../../types/auth";

// Response parser
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";

// Toast
import { showToast } from "../../../utils/toast.util";

export const forgotPasswordHandler = async (data : ForgotPasswordFormData)=>{
    try{
        const response = await forgotPasswordAPI(data);
        const parsedResponse = parseSuccessResponse(response);
        showToast.success(parsedResponse.message);
    }catch(error){
        const parsedResponse = parseErrorResponse(error);
        showToast.error(parsedResponse.message);
    }
}