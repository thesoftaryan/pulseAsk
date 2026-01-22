import { loginUserThunk } from "../../../store/auth/thunks/login.thunk";
import { useAppDispatch } from "../../../hooks/store.hooks";

// Service
import { socialSignInService } from "../../../services/auth/socialSignIn.service";

// Types
import type { OAuthProvider } from "../../../types/auth.types";
import type { LoginFormData } from "../../../types/auth.types";

// Toast
import { showToast } from "../../../utils/toast.util";

export const useLoginHandler = ()=>{
    const dispatch = useAppDispatch();

    const loginHandler = async (data: LoginFormData, onSuccess?: ()=>void) => {
        try{
            await dispatch(loginUserThunk(data)).unwrap();
            showToast.success("Login successful");
            onSuccess?.();
        }catch(error : any){
            showToast.error(error?.message ?? "Something went wrong");
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