import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../../../services/auth/login.service";

import { parseSuccessResponse, parseErrorResponse } from "../../../services/apiResponseParser.service";
import type { LoginFormData } from "../../../types/ApiRequest/auth.type";
import type { ApiError, ApiResponse } from "../../../types/ApiResponse/index.type";
import type { UserResponse } from "../../../types/ApiResponse/user.type";


export const loginThunk = createAsyncThunk<ApiResponse<UserResponse>, LoginFormData,{rejectValue : ApiError}>(
    "auth/login",
    async (data, {rejectWithValue})=>{
        try{
            const response = await loginService(data);
            return parseSuccessResponse<UserResponse>(response);
        }catch(error){
            return rejectWithValue(parseErrorResponse(error));
        }
    }
)