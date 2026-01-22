import type { User } from "../user.types";

export interface AuthState {
    isAuthenticated : boolean;
    user : User | null;
    status : "idle" | "loading" | "authenticated" | "unauthenticated";
    error : string | null;
}