import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RegisterFormData } from "../../../types/auth.types";
import { registerService } from "../../../services/auth/register.service";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import type { ApiError, ApiResponse, NoDataResponse } from "../../../types/apiResponse.types";


export const registerThunk = createAsyncThunk<ApiResponse<NoDataResponse>, RegisterFormData, {rejectValue : ApiError}>(
    "auth/register",
    async (data, {rejectWithValue})=>{
        try{
            const response = await registerService(data);
            return parseSuccessResponse(response);
        }catch(error){
            return rejectWithValue(parseErrorResponse(error));
        }
    },
)