import {Request, Response, NextFunction} from "express";

import { verifyToken } from "../utils/jwt.util";
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes";
import { TokenData } from "../types/auth.types";


export const authMiddleware = (req : Request, res : Response, next : NextFunction)=>{
    
    const token = req.cookies?.access_token;

    if(!token){
        throw new ApiError(
            STATUS.CLIENT_ERROR.UNAUTHORIZED,
            "Authentication Required",
        );
    }

    try{
        const decoded = verifyToken(token, "access") as TokenData;
        req.user = {
            uid: decoded.uid,
            email : decoded.email,
        };
        next();
    }catch(err){
        throw new ApiError(
            STATUS.CLIENT_ERROR.UNAUTHORIZED,
            "Invalid or expired token",
        );
    }

};