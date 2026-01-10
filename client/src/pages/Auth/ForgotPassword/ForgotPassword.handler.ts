import { forgotPasswordAPI } from "../../../api/auth.api";
import type { ForgotPasswordFormData } from "../../../types/auth";

export const forgotPasswordHandler = async (data : ForgotPasswordFormData)=>{
    try{
        const response = await forgotPasswordAPI(data);
        console.log("Forgot Password Response", response);
    }catch(error){
        console.error("Forgot Password Error: ",error);
    }
}