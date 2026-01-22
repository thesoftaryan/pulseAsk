import type { ForgotPasswordFormData } from "../../../types/auth.types";
import { isValidEmail } from "../../../utils/validationHelpers.util";

export const forgotPasswordValidator = (data : ForgotPasswordFormData)=>{
    const errors : Record<string, string> = {};

    const {email} = data;

    if(!isValidEmail(email)){
        errors.email = "Invalid email";
    }

    return errors;
}