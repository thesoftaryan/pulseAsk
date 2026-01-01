import {Request, Response} from "express";

// User Model
import { User } from "../models/User.model";

// Custom status codes for http responses
import { STATUS } from "../constants/statusCodes";

// Custom response structure
import { successResponse} from "../utils/response.util"

// Payload Types
import { LoginPayload, RegisterPayload } from "../types/auth.types";

// Auth Services
import { loginUser, registerUser } from "../services/auth.service";
import { signToken } from "../utils/jwt.util";

export const registerController = async (req: Request, res: Response)=>{
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
}

export const loginController = async (req: Request, res: Response)=>{
    const payload = req.body as LoginPayload;
    
    const user = await loginUser(payload);

    // console.log(user);

    const tokenPayload = {
        uid : user._id,
        email: user.email,
    }

    const token = signToken(tokenPayload);

    res.cookie("access_token", token, {
        httpOnly:true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        // 14 days
        maxAge: 14 * 24 * 60 * 60 * 1000,
    });


    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "User Login Successfull",
        {
            uid : user._id,
            email : user.email,
            firstName : user.firstName,
            lastName : user.lastName,
        }
    );
}

export const logoutController = (req : Request, res : Response)=>{
    res.clearCookie("access-token");
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Logged out successfully",
    );
}