// Backend Service
import { resetPasswordService } from "../../../services/auth/resetPassword.service";
// Types
import type { ResetPasswordFormData } from "../../../types/auth.types";
// Toast
import { showToast } from "../../../utils/toast.util";

export const resetPasswordHandler = async (data : ResetPasswordFormData)=>{
    const response = await resetPasswordService(data);
    if(response.success){
        showToast.success(response.message);
    }else{
        showToast.error(response.message);
    }
}