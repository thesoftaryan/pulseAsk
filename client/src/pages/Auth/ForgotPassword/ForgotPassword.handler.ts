// Backend Service
import { useAppDispatch } from "../../../hooks/store.hooks";

import { forgotPasswordThunk } from "../../../store/auth/thunks/forgotPassword.thunk";
import type { ApiError } from "../../../types/apiResponse.types";

// Types
import type { ForgotPasswordFormData } from "../../../types/auth.types";

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

