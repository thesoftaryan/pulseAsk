import { isValidEmail, isStrongPassword } from "../../../utils/validationHelpers";

export interface LoginFormData{
    email:string;
    password:string;
}

export const loginFormValidator = (data : LoginFormData) => {
    const errors:{email?:string; password?: string} = {};

    if(!data.email) errors.email = "Email is Required";
    else if(!isValidEmail(data.email)) errors.email = "Email isn't Valid";

    if(!data.password) errors.password = "Password is Required";
    else if(data.password.length<8) errors.password="Password must be of atleast 8 chars";
    else if(!isStrongPassword(data.password)) errors.password = "Password must contain atleast one lowercase, uppercase, digit and special character";

    return errors;
}