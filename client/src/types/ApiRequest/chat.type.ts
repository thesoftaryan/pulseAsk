export interface FetchMessagesPayload{
    conversationId: string;
}

export interface GetUserContactDetailsPayload{
    userId: string;
}

export interface SendMessagePayload{
    senderId: string;
    receiverId: string;
    content: string;
    caption?:string;
    type: "text" | "image";
}