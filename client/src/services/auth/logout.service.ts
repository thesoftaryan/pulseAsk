import { logoutUserAPI } from "../../api/auth.api"

export const logoutService = async ()=>{
    return logoutUserAPI();
}