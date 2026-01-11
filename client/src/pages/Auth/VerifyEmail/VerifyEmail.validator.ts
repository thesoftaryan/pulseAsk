import type { VerifyEmailFormData } from "../../../types/auth";
import { isValidEmail } from "../../../utils/validationHelpers";

export const verifyEmailValidator = (data : VerifyEmailFormData)=>{
    const errors : Record<string, string> = {};

    const {email} = data;

    if(!isValidEmail(email)){
        errors.email = "Invalid email";
    }

    return errors;
}