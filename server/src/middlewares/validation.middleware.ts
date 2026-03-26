import {Request, Response, NextFunction} from "express";
import { STATUS } from "../constants/statusCodes";
import { errorResponse } from "../utils/response.util";
import { ApiError } from "../utils/error.util";

type ValidatorFunction = (body : any) => Record<string, string>;

export const validate = (validator : ValidatorFunction) => 
    (req : Request, res : Response, next : NextFunction) => {
        // console.log("inside validation middleware");
        const errors = validator(req.body);
        if(Object.keys(errors).length >0){
            throw new ApiError(
                STATUS.CLIENT_ERROR.BAD_REQUEST,
                errors.message??"Invalid request",
                errors
            );
        }
        // console.log("calling next function");
        next();
    };