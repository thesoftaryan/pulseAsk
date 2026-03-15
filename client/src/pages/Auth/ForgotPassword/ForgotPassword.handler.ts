// Backend Service
import { useAppDispatch } from "../../../hooks/store.hook";

import { forgotPasswordThunk } from "../../../store/auth/thunks/forgotPassword.thunk";
import type { ApiError } from "../../../types/ApiResponse/index.type";

// Types
import type { ForgotPasswordFormData } from "../../../types/ApiRequest/auth.type";

// Toast
import { showToast } from "../../../utils/toast.util";

export const useForgotPasswordHandler = ()=>{

    const dispatch = useAppDispatch();

    const forgotPasswordHandler = async (data : ForgotPasswordFormData)=>{
        try{
            const response = await dispatch(forgotPasswordThunk(data)).unwrap();
            showToast.success(response.message);
        }catch(error){
            const err = error as ApiError;
            showToast.error(err.message);
        }
    }

    return {forgotPasswordHandler};
}

