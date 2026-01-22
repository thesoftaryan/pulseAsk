import { isValidEmail, isStrongPassword } from "../../../utils/validationHelpers.util";

import type { LoginFormData } from "../../../types/auth.types";

export const loginFormValidator = (data : LoginFormData) => {
    const errors:{email?:string; password?: string} = {};

    if(!data.email) errors.email = "Email is required";
    else if(!isValidEmail(data.email)) errors.email = "Email isn't valid";
    
    else if(!data.password) errors.password = "Password is required";
    else if(data.password.length<8) errors.password="Invalid Password";
    else if(!isStrongPassword(data.password)) errors.password = "Invalid Password";

    return errors;
}