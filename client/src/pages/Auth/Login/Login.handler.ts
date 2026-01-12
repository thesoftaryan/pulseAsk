import { loginUserAPI, socialSignInAPI } from "../../../api/auth.api";

// Types
import type { OAuthProvider } from "../../../types/auth";
import type { LoginFormData } from "../../../types/auth";

// Toast
import toast from "react-hot-toast";

export const loginHandler = async (data : LoginFormData)=>{
    try{
        const response = await loginUserAPI(data);

        console.log("Response : ", response.data);
    }catch(error){
        console.log(error);
        toast.error(`Error logging in the user`, {
            duration : 10000,
        });
    }
}

export const socialLoginHandler = (provider : OAuthProvider)=>{
    socialSignInAPI(provider);
}
