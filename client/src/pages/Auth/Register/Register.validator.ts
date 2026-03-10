import { isValidName, isStrongPassword, isValidEmail } from "../../../utils/validationHelpers.util";

import type {RegisterFormData} from "../../../types/auth.types";


export const registerFormValidator = (data : RegisterFormData)=>{
    const errors : Partial<RegisterFormData> = {};

    if(!data.firstName || !isValidName(data.firstName)) errors.firstName="Invalid First Name";
    else if(!data.lastName || !isValidName(data.lastName)) errors.lastName="Invalid Last Name";

    else if(!data.email) errors.email = "Email is required";
    else if(!isValidEmail(data.email)) errors.email = "Email isn't valid";

    else if(!data.password) errors.password = "Password is required";
    else if(data.password.length<8) errors.password="Atleast 8 characters required";
    else if(!isStrongPassword(data.password)) errors.password = "Use upper, lower, number & symbol";
   
    else if(!data.agreement) errors.agreement=false;

    return errors;
}