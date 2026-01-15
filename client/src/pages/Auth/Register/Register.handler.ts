import { registerUserAPI, socialSignInAPI } from "../../../api/auth.api";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";

// Types
import type { OAuthProvider, RegisterFormData } from "../../../types/auth";

// Toast
import { showToast } from "../../../utils/toast.util";

export const registerHandler = async (data : RegisterFormData) => {
    try{
        const response = await registerUserAPI(data);
        const parsedResponse = parseSuccessResponse(response);
        showToast.success(parsedResponse.message);
    }catch(error){
        const parsedResponse = parseErrorResponse(error);
        showToast.error(parsedResponse.message)
    }
}

export const socialRegisterHandler = (provider : OAuthProvider)=>{
    socialSignInAPI(provider);
}
