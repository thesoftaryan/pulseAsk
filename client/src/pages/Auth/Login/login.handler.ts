import { loginUser, socialSignIn } from "../../../api/auth.api";
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

export const socialLoginHandler = async ()=>{
    try{
        const response = await socialSignIn();
        console.log("response : ", response);
    }catch(error){
        console.error("Error social signin : ", error);
    }
}
