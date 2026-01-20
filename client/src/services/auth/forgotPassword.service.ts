import { forgotPasswordAPI } from "../../api/auth.api";
import type { ApiResponse } from "../../types/apiResponse";
import type { ForgotPasswordFormData } from "../../types/auth";
import { parseErrorResponse, parseSuccessResponse } from "../apiResponseParser.service";


export const forgotPasswordService = async (data : ForgotPasswordFormData) : Promise<ApiResponse<unknown>> =>{
    try{
        const response = await forgotPasswordAPI(data);
        return parseSuccessResponse(response);
    }catch(error){
        return parseErrorResponse(error);
    }
}