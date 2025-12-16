import { registerUser } from "../../../api/auth.api";
import type { RegisterFormData } from "./Register.validator";

const registerHandler = async (data : RegisterFormData) => {
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

export default registerHandler;