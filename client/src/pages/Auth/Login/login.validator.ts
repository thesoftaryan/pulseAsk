import { isValidEmail, isStrongPassword } from "../../../utils/validationHelpers";

export interface LoginFormData{
    email:string;
    password:string;
}

export const loginFormValidator = (data : LoginFormData) => {
    const errors:{email?:string; password?: string} = {};

    if(!data.email) errors.email = "Email is required";
    else if(!isValidEmail(data.email)) errors.email = "Email isn't valid";

    if(!data.password) errors.password = "Password is required";
    else if(data.password.length<8) errors.password="Atleast 8 characters required";
    else if(!isStrongPassword(data.password)) errors.password = "Use upper, lower, number & symbol";

    return errors;
}