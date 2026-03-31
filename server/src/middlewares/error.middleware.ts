import {Request, Response, NextFunction} from "express";
import { ApiError, RedirectError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes.constants";
import { errorResponse, redirectResponse } from "../utils/response.util";

export const errorMiddleware = (err : unknown, req : Request, res : Response, next : NextFunction)=>{
    if( err instanceof ApiError){
        console.error("Error : ", `statusCode(${err.statusCode}) -> `, err.message);
        return errorResponse(
            res,
            err.statusCode,
            err.message,
            err.details,
        );
    }

    if(err instanceof RedirectError){
        return redirectResponse(
            res,
            err.redirectionURL,
        );
    }

    // For any syntax error of JSON request
    if(err instanceof SyntaxError && "body" in err){
        return errorResponse(
            res, 
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Invalid JSON request body",
        );
    }

    console.error("Unhandled error : ", err);

    return errorResponse(res, STATUS.SERVER_ERROR.INTERNAL, "Internal Server Error");
}