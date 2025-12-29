import {Request, Response} from "express";

// User Model
import { User } from "../models/User.model";

// Custom status codes for http responses
import { STATUS } from "../constants/statusCodes";

// Custom response structure
import { successResponse, errorResponse} from "../utils/response";

// validation logic
import { isValidEmail, isStrongPassword, isValidName } from "../validations/auth.validation";
import { error } from "console";
import { configDotenv } from "dotenv";

export const registerController = async (req: Request, res: Response)=>{
    try{
        
        // This will just print [object, object] because when using
        // backticks javascript does : req.body.toString() and
        // for object this function '.toString()' returns [object, object]
        // console.log(`Data received for register : ${req.body}`);
        // Correct :
        // console.log("Data received for register : ", req.body);

        const {firstName, lastName, email, password} = req.body;

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
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
        const {email, password} = req.body;

        // We will see to shift this to a middleware in the auth routes
        if(!isValidEmail(email) || !isStrongPassword(password)){
            return errorResponse(res, STATUS.CLIENT_ERROR.BAD_REQUEST, "Invalid email or password", {
                code:STATUS.CLIENT_ERROR.BAD_REQUEST.toString(),
                details : "Invalid email or password",
            },);
        }





        res.status(201).json({
            success: true,
            message: "Demo User login Successful",
            token:"jwt-token-for-cookies",
            data : req.body,
        });
    }catch(error){
        errorResponse(res, STATUS.SERVER_ERROR.INTERNAL, "Error Registering User", {
            code : "",
            details : "Internal Server Error",
        });
    }
}