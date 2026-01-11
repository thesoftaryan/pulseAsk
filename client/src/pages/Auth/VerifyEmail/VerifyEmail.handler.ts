import { verifyEmailAPI } from "../../../api/auth.api";
import type { VerifyEmailFormData } from "../../../types/auth";


export const verifyEmailHandler = async (data : VerifyEmailFormData)=>{
    try{
        const response = await verifyEmailAPI(data);
        console.log(response);
    }catch(error){
        console.error("Error Resending the mail");
    }
}