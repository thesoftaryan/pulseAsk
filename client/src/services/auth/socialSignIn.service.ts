import { socialSignInAPI } from "../../api/auth.api";
import type { OAuthProvider } from "../../types/auth";

export const socialSignInService = (provider : OAuthProvider) =>{
    socialSignInAPI(provider);
}