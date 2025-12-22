import {Request, Response} from "express";

// User Model
import { User } from "../models/User.model";

// Custom status codes for http responses
import { STATUS } from "../constants/statusCodes";

// Custom response structure
import { successResponse, errorResponse} from "../utils/response";

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

        successResponse(res, STATUS.SUCCESS.CREATED, "User registration successful", req.body, {
            uid : user._id.toString(),
            createdAt : user.createdAt.toISOString(),
        });

    }catch(error){
        errorResponse(res, STATUS.SERVER_ERROR.INTERNAL, "Error Registering User", {
            code : "",
            details : "Internal Server Error",
        });
    }
}

export const loginController = async (req: Request, res: Response)=>{
    try{
        console.log("Data received for login : ", req.body);

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