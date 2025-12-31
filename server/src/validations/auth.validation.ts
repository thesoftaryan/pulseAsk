import {LoginPayload, RegisterPayload} from "../types/auth.types";
import { isValidName, isValidEmail, isStrongPassword } from "../utils/validation.util";

export const validateRegister = (body : RegisterPayload)=>{
    const errors : Record<string, string> = {};

    if(!body || typeof body !== "object"){
        errors.body = "Request Body is Required";
        return errors;
    }

    const {firstName, lastName, email, password}  = body;

    if(!isValidName(firstName)){
        errors.firstName = "First Name is not valid";
    }
    if(!isValidName(lastName)){
        errors.lastName = "Last Name is not valid";
    }

    if(!isValidEmail(email)){
        errors.email = "Email is not valid";
    }

    if(!isStrongPassword(password)){
        errors.password = "Password is not valid";
    }
    
    return Object.keys(errors).length ? errors : null;
}

export const validateLogin = (body : LoginPayload) => {
    const errors : Record<string, string> = {};

    if(!body || typeof body !== "object"){
        errors.body = "Request Body is Required";
        return errors;
    }

    const {email, password} = body;

    if(!isValidEmail(email)){
        errors.email = "Email is not valid";
    }

    if(!isStrongPassword(password)){
        errors.password = "Password is not valid";
    }
    
    return Object.keys(errors).length ? errors : null;

}