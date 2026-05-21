// Types
import type { ResetPasswordFormData } from "../../../types/ApiRequest/auth.type";
// Toast
import { showToast } from "../../../utils/toast.util";
import { useAppDispatch } from "../../../hooks/store.hook";
import type { ApiError } from "../../../types/ApiResponse/index.type";
import { resetPasswordThunk } from "../../../store/auth/thunks/resetPassword.thunk";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { authRoutes } from "../../../routes/routesConstants";


export const useResetPasswordHandler = ()=>{
    const dispatch = useAppDispatch();
    const {safeNavigate} = useSafeNavigate();
    const resetPasswordHandler = async (data : ResetPasswordFormData)=>{
        try{
            const response = await dispatch(resetPasswordThunk(data)).unwrap();
            showToast.success(response.message);
            safeNavigate(authRoutes.login);
        }catch(error){
            const err = error as ApiError;
            showToast.error(err.message);    
        }
        
    }
    
    return {resetPasswordHandler};
}