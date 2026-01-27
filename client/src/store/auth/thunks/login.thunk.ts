import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../../../services/auth/login.service";

import { parseSuccessResponse, parseErrorResponse } from "../../../services/apiResponseParser.service";
import type { LoginFormData } from "../../../types/auth.types";
import type { ApiError, ApiResponse, UserResponseData } from "../../../types/apiResponse.types";

export const loginThunk = createAsyncThunk<ApiResponse<UserResponseData>, LoginFormData,{rejectValue : ApiError}>(
    "auth/login",
    async (data, {rejectWithValue})=>{
        try{
            const response = await loginService(data);
            return parseSuccessResponse<UserResponseData>(response);
        }catch(error){
            return rejectWithValue(parseErrorResponse(error));
        }
    }
)