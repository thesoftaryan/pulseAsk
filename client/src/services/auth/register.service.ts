import { registerUserAPI } from "../../api/auth.api";
import { parseErrorResponse, parseSuccessResponse } from "../apiResponseParser.service";

import type { ApiResponse } from "../../types/apiResponse";
import type { RegisterFormData } from "../../types/auth";

export const registerService = async (data : RegisterFormData) : Promise<ApiResponse<unknown>>=>{
    try{
        const response = await registerUserAPI(data);
        return parseSuccessResponse(response);
    }catch(error){
        return parseErrorResponse(error);
    }
}