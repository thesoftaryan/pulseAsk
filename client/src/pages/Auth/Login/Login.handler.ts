import { loginThunk } from "../../../store/auth/thunks/login.thunk";
import { useAppDispatch } from "../../../hooks/store.hooks";

// Service
import { socialSignInService } from "../../../services/auth/socialSignIn.service";

// Types
import type { OAuthProvider } from "../../../types/auth.types";
import type { LoginFormData } from "../../../types/auth.types";
import type { ApiError } from "../../../types/apiResponse.types";

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
        socialSignInService(provider);
    }

    return {
        loginHandler,
        socialLoginHandler,
    }
}