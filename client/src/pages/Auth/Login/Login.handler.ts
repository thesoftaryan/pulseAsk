// Service
import { loginService } from "../../../services/auth/login.service";
import { socialSignInService } from "../../../services/auth/socialSignIn.service";

// Types
import type { OAuthProvider } from "../../../types/auth";
import type { LoginFormData } from "../../../types/auth";

// Toast
import { showToast } from "../../../utils/toast.util";

export const loginHandler = async (data: LoginFormData, onSuccess?: ()=>void) => {
    const response = await loginService(data);
    if(response.success) {
        showToast.success(response.message);
        onSuccess?.();
    } else{
        showToast.error(response.message);
    }
}

export const socialLoginHandler = (provider: OAuthProvider) => {
    socialSignInService(provider);
}
