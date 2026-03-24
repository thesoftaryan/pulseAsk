export interface FetchCommentsPayload{
    targetId: string;
}

export interface PostCommentPayload{
    targetId: string;
    content: string;
}