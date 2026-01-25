// Backend Service
import { useAppDispatch } from "../../../hooks/store.hooks";

import { resendVerificationEmailThunk } from "../../../store/auth/thunks/resendVerificationEmail.thunk";
import type { ApiError } from "../../../types/apiResponse.types";

// Types
import type { ResendVerificationEmailFormData } from "../../../types/auth.types";

// Toast
import { showToast } from "../../../utils/toast.util";


export const useResendVerficationEmailHandler = ()=>{
    
    const dispatch = useAppDispatch();

    const resendVerificationEmailHandler = async (data : ResendVerificationEmailFormData)=>{
        try{
            const response = await dispatch(resendVerificationEmailThunk(data)).unwrap();
            showToast.success(response.message);
        }catch(error){
            const err = error as ApiError;
            showToast.error(err.message);    
        }
    }

    return {resendVerificationEmailHandler};
}

