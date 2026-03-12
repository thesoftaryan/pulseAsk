import type { ApiError, ApiResponse } from "../types/ApiResponse/index.type";

import {AxiosError, type AxiosResponse} from "axios";


export const parseSuccessResponse = <T>(response : AxiosResponse) : ApiResponse<T> => {
    const parsed : ApiResponse<T> = {
        success : true,
        message : response.data.message,
        data  : response.data.data,
        meta : response.data.meta,
    }
    return parsed;
}

export const parseErrorResponse = (response : unknown) : ApiError =>{
    const parsed : ApiError = {
        success : false,
        message : "Unexpected error occurred",
    }
    if(response instanceof AxiosError){
        parsed.message = response.response?.data?.message || "Something went wrong, Please try again.";
        parsed.meta = response.response?.data?.meta;
    }
    else if(response instanceof Error){
        parsed.message = response.message;
    }
    return parsed;
}