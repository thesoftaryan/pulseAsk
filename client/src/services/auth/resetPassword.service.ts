import { resetPasswordAPI } from "../../api/auth.api";

import type { ResetPasswordFormData } from "../../types/ApiRequest/auth.type";

export const resetPasswordService = async (data : ResetPasswordFormData) => {
    return resetPasswordAPI(data);
}