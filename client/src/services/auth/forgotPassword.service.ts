import { forgotPasswordAPI } from "../../api/auth.api";

import type { ForgotPasswordFormData } from "../../types/auth.types";


export const forgotPasswordService = async (data : ForgotPasswordFormData) =>{
    return forgotPasswordAPI(data);
}