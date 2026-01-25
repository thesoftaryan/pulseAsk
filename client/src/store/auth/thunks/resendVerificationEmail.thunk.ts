import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ResendVerificationEmailFormData } from "../../../types/auth.types";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import type { ApiError, ApiResponse, NoDataResponse } from "../../../types/apiResponse.types";
import { resendVerificationEmailService } from "../../../services/auth/resendVerificationEmail.service";


export const resendVerificationEmailThunk = createAsyncThunk<ApiResponse<NoDataResponse>, ResendVerificationEmailFormData, {rejectValue : ApiError}>(
    "auth/resendVerificationEmail",
    async (data, {rejectWithValue})=>{
        try{
            const response = await resendVerificationEmailService(data);
            return parseSuccessResponse(response);
        }catch(error){
            return rejectWithValue(parseErrorResponse(error));
        }
    },
)