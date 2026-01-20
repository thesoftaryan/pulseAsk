import { resendVerificationEmailAPI } from "../../api/auth.api";
import type { ApiResponse } from "../../types/apiResponse";
import type { ResendVerificationEmailFormData } from "../../types/auth";
import { parseErrorResponse, parseSuccessResponse } from "../apiResponseParser.service";

export const resendVerificationEmailService = async (data : ResendVerificationEmailFormData) : Promise<ApiResponse<unknown>> =>{
    try {
        const response = await resendVerificationEmailAPI(data);
        return parseSuccessResponse(response);
    } catch (error) {
        return parseErrorResponse(error);
    }
}