// Backend Service
import { resendVerificationEmailService } from "../../../services/auth/resendVerificationEmail.service";

// Types
import type { ResendVerificationEmailFormData } from "../../../types/auth.types";

// Toast
import { showToast } from "../../../utils/toast.util";


export const resendVerificationEmailHandler = async (data : ResendVerificationEmailFormData)=>{
    const response = await resendVerificationEmailService(data);
    if(response.success){
        showToast.success(response.message);
    }else{
        showToast.error(response.message);
    }
}