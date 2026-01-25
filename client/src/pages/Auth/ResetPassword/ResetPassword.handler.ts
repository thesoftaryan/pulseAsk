// Types
import type { ResetPasswordFormData } from "../../../types/auth.types";
// Toast
import { showToast } from "../../../utils/toast.util";
import { useAppDispatch } from "../../../hooks/store.hooks";
import type { ApiError } from "../../../types/apiResponse.types";
import { resetPasswordThunk } from "../../../store/auth/thunks/resetPassword.thunk";


export const useResetPasswordHandler = ()=>{
    const dispatch = useAppDispatch();
    
    const resetPasswordHandler = async (data : ResetPasswordFormData)=>{
        try{
            const response = await dispatch(resetPasswordThunk(data)).unwrap();
            showToast.success(response.message);
        }catch(error){
            const err = error as ApiError;
            showToast.error(err.message);    
        }
        
    }
    
    return {resetPasswordHandler};
}
