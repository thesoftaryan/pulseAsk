import type { ForgotPasswordFormData } from "../../../types/ApiRequest/auth.type";
import { isValidEmail } from "../../../utils/validation.util";

export const forgotPasswordValidator = (data : ForgotPasswordFormData)=>{
    const errors : Record<string, string> = {};

    const {email} = data;

    if(!isValidEmail(email)){
        errors.email = "Invalid email";
    }

    return errors;
}