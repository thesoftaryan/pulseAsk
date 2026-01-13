import type { AxiosError } from "axios";
import { loginUserAPI, socialSignInAPI } from "../../../api/auth.api";

// Response Parse
import { parseSuccessResponse, parseErrorResponse } from "../../../services/apiResponseParser.service";

// Types
import type { OAuthProvider } from "../../../types/auth";
import type { LoginFormData } from "../../../types/auth";

// Toast
import toast from "react-hot-toast";

export const loginHandler = async (data: LoginFormData) => {
    try {
        const response = await loginUserAPI(data);
        const parsedResponse = parseSuccessResponse(response);
        // console.log("Parsed Response : ", parsedResponse);
        toast.success(parsedResponse.message);
    } catch (error) {
        // console.log(error);
        const parsedResponse = parseErrorResponse(error as AxiosError);
        // console.log("Parsed Response : ", parsedResponse);
        toast.error(parsedResponse.message);
    }
}

export const socialLoginHandler = (provider: OAuthProvider) => {
    socialSignInAPI(provider);
}
