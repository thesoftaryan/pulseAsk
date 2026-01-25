import { resendVerificationEmailAPI } from "../../api/auth.api";

import type { ResendVerificationEmailFormData } from "../../types/auth.types";

export const resendVerificationEmailService = async (data : ResendVerificationEmailFormData) =>{
    return resendVerificationEmailAPI(data);
}