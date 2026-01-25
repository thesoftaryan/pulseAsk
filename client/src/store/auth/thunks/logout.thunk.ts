import { createAsyncThunk } from "@reduxjs/toolkit";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import type { ApiError, ApiResponse, NoDataResponse } from "../../../types/apiResponse.types";
import { logoutService } from "../../../services/auth/logout.service";


export const logoutThunk = createAsyncThunk<ApiResponse<NoDataResponse>, unknown, {rejectValue : ApiError}>(
    "auth/logout",
    async (_, {rejectWithValue})=>{
        try{
            const response = await logoutService();
            return parseSuccessResponse(response);
        }catch(error){
            return rejectWithValue(parseErrorResponse(error));
        }
    },
)