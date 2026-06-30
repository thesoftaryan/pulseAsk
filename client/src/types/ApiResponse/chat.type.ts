export interface PersonInterface{
    _id: string;
    userName: string;
    profile?: string;
    firstName: string;
    lastName?:string;
    status:"online"|"offline";
    lastSeen: Date;
}

export interface ChatMessageInterface{
    _id: string;
    conversationId: string;
    sender: PersonInterface;
    content: string;
    caption?: string;

    type: "text" | "image";

    status: "sent" | "seen";

    sentAt: Date;
}


export interface LastMessageInterface{
    messageType: "image" | "text";
    content: string;
    caption?: string;
    sender: string;
    sentAt: Date;
}

export interface ContactInterface{
    conversationId: string,
    person: PersonInterface,
    lastMessage? : LastMessageInterface,
    unreadCount: number;
}

export interface GetContactsResponse{
    contacts:ContactInterface[];
}

export interface FetchMessagesResponse{
    messages: ChatMessageInterface[];
}
