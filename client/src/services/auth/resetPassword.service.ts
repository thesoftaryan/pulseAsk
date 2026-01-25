import { resetPasswordAPI } from "../../api/auth.api";

import type { ResetPasswordFormData } from "../../types/auth.types";

export const resetPasswordService = async (data : ResetPasswordFormData) => {
    return resetPasswordAPI(data);
}