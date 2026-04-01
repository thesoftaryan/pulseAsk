import type { ResendVerificationEmailFormData } from "../../../types/ApiRequest/auth.type";
import { isValidEmail } from "../../../utils/validation.util";

export const verifyEmailValidator = (data : ResendVerificationEmailFormData)=>{
    const errors : Record<string, string> = {};

    const {email} = data;

    if(!isValidEmail(email)){
        errors.email = "Invalid email";
    }

    return errors;
}