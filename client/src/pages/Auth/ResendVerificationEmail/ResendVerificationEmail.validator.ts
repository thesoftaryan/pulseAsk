import type { ResendVerificationEmailFormData } from "../../../types/auth.types";
import { isValidEmail } from "../../../utils/validationHelpers.util";

export const verifyEmailValidator = (data : ResendVerificationEmailFormData)=>{
    const errors : Record<string, string> = {};

    const {email} = data;

    if(!isValidEmail(email)){
        errors.email = "Invalid email";
    }

    return errors;
}