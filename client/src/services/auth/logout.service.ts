import { logoutAPI } from "../../api/auth.api"

export const logoutService = async ()=>{
    return logoutAPI();
}