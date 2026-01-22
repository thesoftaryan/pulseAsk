import { resetPasswordAPI } from "../../api/auth.api";
import type { ApiResponse } from "../../types/apiResponse.types";
import type { ResetPasswordFormData } from "../../types/auth.types";
import { parseErrorResponse, parseSuccessResponse } from "../apiResponseParser.service";

export const resetPasswordService = async (data : ResetPasswordFormData) : Promise<ApiResponse<unknown>> => {
    try{
        const response = await resetPasswordAPI(data);
        return parseSuccessResponse(response);
    }catch(error){
        return parseErrorResponse(error);
    }
}