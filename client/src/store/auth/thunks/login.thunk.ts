import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../../../services/auth/login.service";

import { parseSuccessResponse, parseErrorResponse } from "../../../services/apiResponseParser.service";
import type { LoginFormData } from "../../../types/auth.types";
import type { ApiError, LoginResponseData } from "../../../types/apiResponse.types";
import type { User } from "../../../types/user.types";

export const loginUserThunk = createAsyncThunk<User, LoginFormData,{rejectValue : ApiError}>(
    "auth/login",
    async (data : LoginFormData, {rejectWithValue})=>{
        try{
            const response = await loginService(data);
            const parsed = parseSuccessResponse<LoginResponseData>(response);
            return parsed.data!.user;
        }catch(error){
            return rejectWithValue(parseErrorResponse(error));
        }
    }
)