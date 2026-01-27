import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkAuthAPI } from "../../../api/auth.api";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import type { ApiError, ApiResponse, UserResponseData } from "../../../types/apiResponse.types";


export const checkAuthThunk = createAsyncThunk<ApiResponse<UserResponseData>, void, {rejectValue : ApiError}>(
    "auth/check",
    async(_, {rejectWithValue})=>{
        try{
            const response = await checkAuthAPI();
            return parseSuccessResponse<UserResponseData>(response);
        }catch(error){
            return rejectWithValue(parseErrorResponse(error));
        }
    }
)