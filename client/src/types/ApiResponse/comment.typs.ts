import type { UserInterface } from "./user.type";

export interface CommentInterface extends Document{
    _id: string;
    answerId: string;
    author : Partial<UserInterface>;
    content: String;
    commentedAt: Date;
}
