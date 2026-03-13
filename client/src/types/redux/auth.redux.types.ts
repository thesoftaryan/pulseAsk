import type { UserInterface } from "../ApiResponse/user.type";

export interface AuthState {
    isAuthenticated : boolean;
    user : Partial<UserInterface> | null;
    status : "idle" | "loading" | "authenticated" | "unauthenticated";
    error : string | null;
}