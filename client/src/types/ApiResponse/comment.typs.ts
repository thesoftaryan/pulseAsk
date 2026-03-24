import type { UserInterface } from "./user.type";

export interface CommentInterface{
    _id: string;
    answerId: string;
    author : Partial<UserInterface>;
    content: String;
    commentedAt: Date;
}

export interface FetchCommentsResponse{
    comments:CommentInterface[],
}

export interface PostCommentResponse{
    
}