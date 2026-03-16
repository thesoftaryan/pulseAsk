import { createAsyncThunk } from "@reduxjs/toolkit";
import { generateTagService } from "../../../services/question/generateTag.service";

import type { ApiError, ApiResponse, TagResponseData } from "../../../types/ApiResponse/index.type";
import type { GenerateTagPayload } from "../../../types/ApiRequest/tag.type";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";


export const generateTagThunk = createAsyncThunk<ApiResponse<TagResponseData>, GenerateTagPayload, {rejectValue: ApiError}>(
    "tag/generate",
    async (data, {rejectWithValue})=>{
        try{
            const response = await generateTagService(data);
            return parseSuccessResponse<TagResponseData>(response);
        }catch(error){
            return rejectWithValue(parseErrorResponse(error));
        }
    }
);