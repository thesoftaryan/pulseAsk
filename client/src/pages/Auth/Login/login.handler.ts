import { loginUser, socialSignIn } from "../../../api/auth.api";

// Types
import type { OAuthProvider } from "../../../types/auth";
import type { LoginFormData } from "./login.validator";

export const loginHandler = async (data : LoginFormData)=>{
    try{
        const response = await loginUser({
            email : data.email,
            password : data.password,
        });

        console.log("Response : ", response.data);
    }catch(error){
        console.error("Error logging in the user : ", error);
    }
}

export const socialLoginHandler = (provider : OAuthProvider)=>{
    socialSignIn(provider);
}
