import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuthAPI } from "../../../api/auth.api";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import type { ApiError, ApiResponse } from "../../../types/ApiResponse/index.type";
import type { UserResponse } from "../../../types/ApiResponse/user.type";

export const checkAuthThunk = createAsyncThunk<ApiResponse<UserResponse>, void, {rejectValue : ApiError}>(
    "auth/check",
    async(_, {rejectWithValue})=>{
        try{
            const response = await checkAuthAPI();
            return parseSuccessResponse<UserResponse>(response);
        }catch(error){
            return rejectWithValue(parseErrorResponse(error));
        }
    }
)