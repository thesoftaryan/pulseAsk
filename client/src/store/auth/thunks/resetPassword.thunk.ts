import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ResetPasswordFormData } from "../../../types/auth.types";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import type { ApiError, ApiResponse, NoDataResponse } from "../../../types/apiResponse.types";
import { resetPasswordService } from "../../../services/auth/resetPassword.service";


export const resetPasswordThunk = createAsyncThunk<ApiResponse<NoDataResponse>, ResetPasswordFormData, {rejectValue : ApiError}>(
    "auth/resetPassword",
    async (data, {rejectWithValue})=>{
        try{
            const response = await resetPasswordService(data);
            return parseSuccessResponse(response);
        }catch(error){
            return rejectWithValue(parseErrorResponse(error));
        }
    },
)