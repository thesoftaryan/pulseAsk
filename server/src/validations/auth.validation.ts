import {ForgotPasswordPayload, LoginPayload, RefreshTokenPayload, RegisterPayload, ResetPasswordPayload, VerifyEmailPayload} from "../types/auth.types";
import { isValidName, isValidEmail, isStrongPassword } from "../utils/validation.util";

export const validateRegister = (body : RegisterPayload) => {
    const errors : Record<string, string> = {};

    if(!body || typeof body !== "object"){
        errors.body = "Request Body is Required";
        return errors;
    }

    const {firstName, lastName, email, password} = body;

    if(!isValidName(firstName)){
        errors.firstName = "Invalid First Name";
    }
    else if(!isValidName(lastName)){
        errors.lastName = "Invalid Last Name";
    }

    else if(!isValidEmail(email)){
        errors.email = "Invalid Email";
    }

    else if(!isStrongPassword(password)){
        errors.password = "Invalid Password";
    }
    
    return errors;
}

export const validateLogin = (body : LoginPayload) => {
    const errors : Record<string, string> = {};

    if(!body || typeof body !== "object"){
        errors.body = "Request Body is Required";
        return errors;
    }

    const {email, password} = body;
    const rememberMe = body.rememberMe;

    // console.log("Login remember : ", rememberMe);

    if(!isValidEmail(email)){
        errors.email = "Invalid email";
    }

    else if(!isStrongPassword(password)){
        errors.password = "Invalid password";
    }

    else if(rememberMe===undefined){
        errors.rememberMe = "Remember me is required";
    }
    
    return errors;
}

export const validateForgotPassword = (body : ForgotPasswordPayload) => {
    const errors : Record<string, string> = {};

    if(!body || typeof body !== "object"){
        errors.body = "Request Body is Required";
        return errors;
    }

    const {email} = body;

    if(!isValidEmail(email)){
        errors.email = "Invalid email";
    }

    return errors;
}

export const validateResetPassword = (body : ResetPasswordPayload)=>{
    const errors : Record<string, string> = {};

    if(!body || typeof body !== "object"){
        errors.body = "Request Body is Required";
        return errors;
    }

    const {password, token} = body;

    if(!isStrongPassword(password)){
        errors.password = "Invalid password";
    }
    if(!token || !token.length){
        errors.token = "Invalid token";
    }

    return errors;
}

export const validateVerifyEmail = (body : VerifyEmailPayload)=>{
    const errors : Record<string, string> = {};

    if(!body || typeof body !== "object"){
        errors.body = "Request Body is Required";
        return errors;
    }

    const {email} = body;

    if(!isValidEmail(email)){
        errors.email = "Invalid email";
    }
    
    return errors;
}