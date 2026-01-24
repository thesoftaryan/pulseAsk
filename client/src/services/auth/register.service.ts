import { registerUserAPI } from "../../api/auth.api";

import type { RegisterFormData } from "../../types/auth.types";

export const registerService = async (data : RegisterFormData)=>{
    return registerUserAPI(data);
}