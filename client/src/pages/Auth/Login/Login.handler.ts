import type { AxiosError } from "axios";
import { loginUserAPI, socialSignInAPI } from "../../../api/auth.api";

// Response Parse
import { parseSuccessResponse, parseErrorResponse } from "../../../services/apiResponseParser.service";

// Types
import type { OAuthProvider } from "../../../types/auth";
import type { LoginFormData } from "../../../types/auth";

// Toast
import { showToast } from "../../../utils/toast.util";

export const loginHandler = async (data: LoginFormData, onSuccess?: ()=>void) => {
    try {
        const response = await loginUserAPI(data);
        const parsedResponse = parseSuccessResponse(response);
        showToast.success(parsedResponse.message);
        onSuccess?.();
    } catch (error) {
        const parsedResponse = parseErrorResponse(error as AxiosError);
        showToast.error(parsedResponse.message);
    }
}

export const socialLoginHandler = (provider: OAuthProvider) => {
    socialSignInAPI(provider);
}
