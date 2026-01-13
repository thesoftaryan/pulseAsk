import { registerUserAPI, socialSignInAPI } from "../../../api/auth.api";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";

// Types
import type { OAuthProvider, RegisterFormData } from "../../../types/auth";

// Toast
import toast from "react-hot-toast";

export const registerHandler = async (data : RegisterFormData) => {
    try{
        const response = await registerUserAPI(data);
        const parsedResponse = parseSuccessResponse(response);
        toast.success(parsedResponse.message);
    }catch(error){
        // console.error("Error registering the user : ", error);
        const parsedResponse = parseErrorResponse(error);
        toast.error(parsedResponse.message)
    }
}

export const socialRegisterHandler = (provider : OAuthProvider)=>{
    socialSignInAPI(provider);
}
