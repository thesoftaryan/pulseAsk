import { resendVerificationEmailAPI } from "../../api/auth.api";

import type { ResendVerificationEmailFormData } from "../../types/ApiRequest/auth.type";

export const resendVerificationEmailService = async (data : ResendVerificationEmailFormData) =>{
    return resendVerificationEmailAPI(data);
}