import { loginUser } from "../../../api/auth.api";
import type { LoginFormData } from "./login.validator";

const loginHandler = async (data : LoginFormData)=>{
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

export default loginHandler;