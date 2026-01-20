import { loginUserAPI } from "../../api/auth.api";
import { parseErrorResponse, parseSuccessResponse } from "../apiResponseParser.service";

import type { ApiResponse } from "../../types/apiResponse";
import type { LoginFormData } from "../../types/auth";

export const loginService = async (data : LoginFormData) : Promise<ApiResponse<unknown>> =>{
    try {
        const response = await loginUserAPI(data);
        return parseSuccessResponse(response);
    } catch (error) {
        return parseErrorResponse(error);
    }
}