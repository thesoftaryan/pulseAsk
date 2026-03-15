import { socialSignInAPI } from "../../api/auth.api";
import type { OAuthProvider } from "../../types/ApiRequest/auth.type";

export const socialSignInService = (provider : OAuthProvider) =>{
    socialSignInAPI(provider);
}