import { forgotPasswordAPI } from "../../api/auth.api";

import type { ForgotPasswordFormData } from "../../types/ApiRequest/auth.type";


export const forgotPasswordService = async (data : ForgotPasswordFormData) =>{
    return forgotPasswordAPI(data);
}