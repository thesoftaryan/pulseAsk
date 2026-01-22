import { loginUserAPI } from "../../api/auth.api";

import type { LoginFormData } from "../../types/auth.types";

export const loginService = async (data : LoginFormData) =>{
    return loginUserAPI(data);
}