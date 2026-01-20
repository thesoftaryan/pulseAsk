// Backend Service
import { forgotPasswordService } from "../../../services/auth/forgotPassword.service";

// Types
import type { ForgotPasswordFormData } from "../../../types/auth";

// Toast
import { showToast } from "../../../utils/toast.util";

export const forgotPasswordHandler = async (data : ForgotPasswordFormData)=>{
    const response = await forgotPasswordService(data);
    if(response.success){
        showToast.success(response.message);
    }else{
        showToast.error(response.message);
    }
}