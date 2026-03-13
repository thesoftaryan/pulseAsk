import { loginThunk } from "../../../store/auth/thunks/login.thunk";
import { useAppDispatch } from "../../../hooks/store.hook";

// Service
import { socialSignInService } from "../../../services/auth/socialSignIn.service";

// Types
import type { OAuthProvider } from "../../../types/auth.types";
import type { LoginFormData } from "../../../types/auth.types";
import type { ApiError } from "../../../types/ApiResponse/index.type";

// Toast
import { showToast } from "../../../utils/toast.util";

export const useLoginHandler = ()=>{
    const dispatch = useAppDispatch();

    const loginHandler = async (data: LoginFormData, onSuccess?: ()=>void) => {
        try{
            const response = await dispatch(loginThunk(data)).unwrap();
            showToast.success(response.message);
            onSuccess?.();
        }catch(error){
            const err = error as ApiError
            showToast.error(err.message);
        }

    }

    const socialLoginHandler = (provider: OAuthProvider) => {
        localStorage.setItem("session_active", "true");
        socialSignInService(provider);
    }

    return {
        loginHandler,
        socialLoginHandler,
    }
}