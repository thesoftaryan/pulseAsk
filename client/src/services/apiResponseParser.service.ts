import type { ApiError, ApiSuccess } from "../types/apiResponse";

import {AxiosError, type AxiosResponse} from "axios";


export const parseSuccessResponse = (response : AxiosResponse) => {
    const parsed : ApiSuccess<unknown> = {
        message : response.data.message,
        data : response.data.data,
        meta : response.data.meta,
    }
    return parsed;
}

export const parseErrorResponse = (response : unknown) : ApiError =>{
    const parsed : ApiError = {
        message : "Unexpected error occurred",
    }
    if(response instanceof AxiosError){
        parsed.message = response.response?.data?.message || "Something went wrong, Please try again.";
        parsed.error = response.response?.data?.error;
    }
    else if(response instanceof Error){
        parsed.message = response.message;
    }
    return parsed;
}