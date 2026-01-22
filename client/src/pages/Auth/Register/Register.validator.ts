import { isValidName, isStrongPassword, isValidEmail } from "../../../utils/validationHelpers.util";

import type {RegisterFormData} from "../../../types/auth.types";


export const registerFormValidator = (data : RegisterFormData)=>{
    const errors : Partial<RegisterFormData> = {};

    if(!data.first_name || !isValidName(data.first_name)) errors.first_name="Invalid First Name";
    else if(!data.last_name || !isValidName(data.last_name)) errors.last_name="Invalid Last Name";

    else if(!data.email) errors.email = "Email is required";
    else if(!isValidEmail(data.email)) errors.email = "Email isn't valid";

    else if(!data.password) errors.password = "Password is required";
    else if(data.password.length<8) errors.password="Atleast 8 characters required";
    else if(!isStrongPassword(data.password)) errors.password = "Use upper, lower, number & symbol";
   
    else if(!data.agreement) errors.agreement=false;

    return errors;
}