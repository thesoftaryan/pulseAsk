import { registerUserAPI, socialSignInAPI } from "../../../api/auth.api";

// Types
import type { OAuthProvider, RegisterFormData } from "../../../types/auth";

export const registerHandler = async (data : RegisterFormData) => {
    try{
        const response = await registerUserAPI(data);
        
        console.log("Response : ", response.data);
    }catch(error){
        console.error("Error registering the user : ", error);
    }
}

export const socialRegisterHandler = (provider : OAuthProvider)=>{
    socialSignInAPI(provider);
}
