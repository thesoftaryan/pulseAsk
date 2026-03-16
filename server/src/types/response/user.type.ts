import { UserInterface } from "../../models/User.model";

export interface UserResponse {
    user: Partial<UserInterface>;
}