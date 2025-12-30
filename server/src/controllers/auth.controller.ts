import {Request, Response} from "express";

// User Model
import { User } from "../models/User.model";

// Custom status codes for http responses
import { STATUS } from "../constants/statusCodes";

// Custom response structure
import { successResponse, errorResponse} from "../utils/response.util";

// validation logic
// import { isValidEmail, isStrongPassword, isValidName } from "../validations/auth.validation";

import { error } from "console";
import { configDotenv } from "dotenv";

// Payload Types
import { LoginPayload, RegisterPayload } from "../types/auth.types";

// Auth Services
import { loginUser } from "../services/auth.service";

export const registerController = async (req: Request, res: Response)=>{
    try{
        
        // This will just print [object, object] because when using
        // backticks javascript does : req.body.toString() and
        // for object this function '.toString()' returns [object, object]
        // console.log(`Data received for register : ${req.body}`);
        // Correct :
        // console.log("Data received for register : ", req.body);

        const payload = req.body as RegisterPayload;

        const user = await User.create({
            firstName : payload.firstName,
            lastName : payload.lastName,
            email : payload.email,
            password : payload.password,
        });

        return successResponse(res, STATUS.SUCCESS.CREATED, "User registration successful", req.body, {
            uid : user._id.toString(),
            createdAt : user.createdAt.toISOString(),
        });

    }catch(error){
        return errorResponse(res, STATUS.SERVER_ERROR.INTERNAL, "Error Registering User", {
            code : STATUS.SERVER_ERROR.INTERNAL.toString(),
            details : "Internal Server Error",
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




    }catch(error){
        console.log(error);
        // console.log("some error occurred");
        errorResponse(res, STATUS.SERVER_ERROR.INTERNAL, "Error Logging in User", {
            code : "",
            details : "Internal Server Error",
        });
    }
}