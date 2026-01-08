import {Request, Response, NextFunction} from "express";

import { verifyToken } from "../utils/jwt.util";
import { ApiError } from "../utils/apiError.util";
import { STATUS } from "../constants/statusCodes";


export const authMiddleware = (req : Request, res : Response, next : NextFunction)=>{

    const token = req.cookies?.access_token;

    if(!token){
        return new ApiError(
            STATUS.CLIENT_ERROR.UNAUTHORIZED,
            "Authentication Required",
        );
    }

    try{
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    }catch(err){
        throw new ApiError(
            STATUS.CLIENT_ERROR.UNAUTHORIZED,
            "Invalid or expired token",
        );
    }

};