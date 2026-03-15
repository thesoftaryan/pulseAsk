import { registerAPI } from "../../api/auth.api";

import type { RegisterFormData } from "../../types/ApiRequest/auth.type";

export const registerService = async (data : RegisterFormData)=>{
    return registerAPI(data);
}