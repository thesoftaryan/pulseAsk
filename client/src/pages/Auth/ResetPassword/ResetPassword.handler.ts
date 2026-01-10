import { resetPasswordAPI } from "../../../api/auth.api";
import type { ResetPasswordFormData } from "../../../types/auth";

export const resetPasswordHandler = async (data : ResetPasswordFormData)=>{
    try{
        const response = await resetPasswordAPI(data);
        console.log(response);
    }catch(error){
        console.error("Error resetting the password: ", error);
    }
}