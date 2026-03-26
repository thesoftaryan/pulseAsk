export interface FetchCommentsPayload{
    targetId: string;
    targetType?: "question" | "answer";
}

export interface PostCommentPayload{
    targetId: string;
    content: string;
}