import type { UserResponseData } from "../ApiResponse/index.type";

export interface AuthState {
    isAuthenticated : boolean;
    user : UserResponseData | null;
    status : "idle" | "loading" | "authenticated" | "unauthenticated";
    error : string | null;
}