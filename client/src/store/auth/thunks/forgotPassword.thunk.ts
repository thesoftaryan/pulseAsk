import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ForgotPasswordFormData } from "../../../types/auth.types";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import { forgotPasswordService } from "../../../services/auth/forgotPassword.service";
import type { ApiError, ApiResponse, NoDataResponse } from "../../../types/ApiResponse/index.type";


export const forgotPasswordThunk = createAsyncThunk<ApiResponse<NoDataResponse>, ForgotPasswordFormData, {rejectValue : ApiError}>(
    "auth/forgotPassword",
    async (data, {rejectWithValue})=>{
        try{
            const response = await forgotPasswordService(data);
            return parseSuccessResponse(response);
        }catch(error){
            return rejectWithValue(parseErrorResponse(error));
        }
    },
)