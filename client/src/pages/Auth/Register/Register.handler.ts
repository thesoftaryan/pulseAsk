import { registerUser, socialSignIn } from "../../../api/auth.api";

// Types
import type { OAuthProvider } from "../../../types/auth";
import type { RegisterFormData } from "./Register.validator";

export const registerHandler = async (data : RegisterFormData) => {
    try{
        const response = await registerUser({
            firstName : data.firstName,
            lastName : data.lastName,
            email : data.email,
            password : data.password,
        });
        
        console.log("Response : ", response.data);
    }catch(error){
        console.error("Error registering the user : ", error);
    }
}

export const socialRegisterHandler = (provider : OAuthProvider)=>{
    socialSignIn(provider);
}
