import { isStrongPassword } from "../../../utils/validationHelpers";

// Type
import type { ResetPasswordFormData } from "../../../types/auth";

export const resetPasswordValidator = (data : ResetPasswordFormData) => {
    const errors : Record<string, string> = {};

    const {password, confirmPassword, token} = data;

    if(!isStrongPassword(password)){
        errors.password = "Use capital, small, numbers, special symbols";
    }

    if(password !== confirmPassword){
        errors.confirmPassword = "Password doesn't match";
    }

    if(!token || token.length === 0){
        errors.token = "Invalid Token";
    }

    return errors;
}