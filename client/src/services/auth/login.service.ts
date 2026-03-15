import { loginAPI } from "../../api/auth.api";

import type { LoginFormData } from "../../types/ApiRequest/auth.type";

export const loginService = async (data : LoginFormData) =>{
    return loginAPI(data);
}