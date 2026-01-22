import { registerService } from "../../../services/auth/register.service";
import { socialSignInService } from "../../../services/auth/socialSignIn.service";

// Types
import type { OAuthProvider, RegisterFormData } from "../../../types/auth.types";

// Toast
import { showToast } from "../../../utils/toast.util";

export const registerHandler = async (data : RegisterFormData) => {
    const response = await registerService(data);
    if(response.success){
        showToast.success(response.message);
    }else{
        showToast.error(response.message)
    }
}

export const socialRegisterHandler = (provider : OAuthProvider)=>{
    socialSignInService(provider);
}
