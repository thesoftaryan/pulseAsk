import {Request, Response, NextFunction} from "express";
import { STATUS } from "../constants/statusCodes";
import { errorResponse } from "../utils/response.util";

type ValidatorFunction = (body : any) => Record<string, string> | null;

export const validate = (validator : ValidatorFunction) => 
    (req : Request, res : Response, next : NextFunction) => {
        // console.log("inside validation middleware");
        const errors = validator(req.body);
        if(errors){
            return errorResponse(
                res,
                STATUS.CLIENT_ERROR.BAD_REQUEST,
                "Invalid request",
                errors
            );
        }
        // console.log("calling next function");
        next();
    };