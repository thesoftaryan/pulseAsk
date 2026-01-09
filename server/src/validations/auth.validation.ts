import {LoginPayload, RegisterPayload} from "../types/auth.types";
import { isValidName, isValidEmail, isStrongPassword } from "../utils/validation.util";

export const validateRegister = (body : RegisterPayload) => {
    const errors : Record<string, string> = {};

    if(!body || typeof body !== "object"){
        errors.body = "Request Body is Required";
        return errors;
    }

    const {firstName, lastName, email, password}  = body;

    if(!isValidName(firstName)){
        errors.firstName = "Invalid First Name";
    }
    if(!isValidName(lastName)){
        errors.lastName = "Invalid Last Name";
    }

    if(!isValidEmail(email)){
        errors.email = "Invalid Email";
    }

    if(!isStrongPassword(password)){
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

    if(!isValidEmail(email)){
        errors.email = "Invalid email";
    }

    if(!isStrongPassword(password)){
        errors.password = "Invalid password";
    }
    
    return errors;
}

export const validateForgotPassword = (body : {email : string}) => {
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

export const validateResetPassword = (body : {token : string, password : string})=>{
    const errors : Record<string, string> = {};

    if(!body || typeof body !== "object"){
        errors.body = "Request Body is Required";
        return errors;
    }

    const {token, password} = body;

    if(!isStrongPassword(password)){
        errors.password = "Invalid password";
    }
    if(!token || !token.length){
        errors.token = "Invalid token";
    }

    return errors;
}