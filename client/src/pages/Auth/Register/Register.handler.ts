import { useAppDispatch } from "../../../hooks/store.hook";
import { socialSignInService } from "../../../services/auth/socialSignIn.service";
import { registerThunk } from "../../../store/auth/thunks/register.thunk";
import type { ApiError } from "../../../types/ApiResponse/index.type";

// Types
import type { OAuthProvider, RegisterFormData } from "../../../types/ApiRequest/auth.type";

// Toast
import { showToast } from "../../../utils/toast.util";

export const useRegisterHandler = ()=>{
    const dispatch = useAppDispatch();


    const registerHandler = async (data : RegisterFormData) => {
        try{
            const response = await dispatch(registerThunk(data)).unwrap();
            showToast.success(response.message);
        }catch(error){
            const err = error as ApiError;
            showToast.error(err.message);
        }
    }

    const socialRegisterHandler = (provider : OAuthProvider)=>{
        localStorage.setItem("session_active", "true");
        socialSignInService(provider);
    }

    return {
        registerHandler, socialRegisterHandler
    };
}


