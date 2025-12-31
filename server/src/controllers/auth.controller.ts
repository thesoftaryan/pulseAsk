import {Request, Response} from "express";

// User Model
import { User } from "../models/User.model";

// Custom status codes for http responses
import { STATUS } from "../constants/statusCodes";

// Custom response structure
import { successResponse, errorResponse} from "../utils/response.util"

// Payload Types
import { LoginPayload, RegisterPayload } from "../types/auth.types";

// Auth Services
import { loginUser, registerUser } from "../services/auth.service";
import { ApiError } from "../utils/ApiError.util";

export const registerController = async (req: Request, res: Response)=>{
    try{
        
        // This will just print [object, object] because when using
        // backticks javascript does : req.body.toString() and
        // for object this function '.toString()' returns [object, object]
        // console.log(`Data received for register : ${req.body}`);
        // Correct :
        // console.log("Data received for register : ", req.body);

        const payload = req.body as RegisterPayload;

        const user = await registerUser(payload);

        console.log(user);

        return successResponse(
            res,
            STATUS.SUCCESS.CREATED,
            "User registration successfull",
            user,
        );
    }catch(error){

        if(error instanceof ApiError){
            return errorResponse(
                res,
                error.statusCode,
                error.message,
                error.details,
            );
        }

        return errorResponse(res, STATUS.SERVER_ERROR.INTERNAL, "Internal Server Error", {
            code : "",
            details : "Error Registering User",
        });
    }
}

export const loginController = async (req: Request, res: Response)=>{
    try{
        // console.log("Data received for login : ", req.body);
        // console.log("inside login Controller");
        const payload = req.body as LoginPayload;
        
        const user = await loginUser(payload);

        console.log(user);

        return successResponse(
            res,
            STATUS.SUCCESS.OK,
            "User Login Successfull",
            user,
        );

    }catch(error){
        if( error instanceof ApiError){
            console.error("Error : ", `statusCode(${error.statusCode}) -> `, error.message);
            return errorResponse(
                res,
                error.statusCode,
                error.message,
                error.details,
            );
        }

        errorResponse(res, STATUS.SERVER_ERROR.INTERNAL, "Internal Server Error", {
            code : "",
            details : "Error logging in the user",
        });
    }
}