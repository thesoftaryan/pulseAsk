import { isStrongPassword } from "../../../utils/validationHelpers.util";

// Type
import type { ResetPasswordFormData } from "../../../types/auth.types";

export const resetPasswordValidator = (data : ResetPasswordFormData) => {
    const errors : Record<string, string> = {};

    const {password, confirm_password, token} = data;

    if(!token || token.length === 0){
        errors.token = "Invalid reset link";
    }

    else if(!isStrongPassword(password)){
        errors.password = "Use capital, small, numbers, special symbols";
    }

    else if(password !== confirm_password){
        errors.confirm_password = "Password doesn't match";
    }


    return errors;
}