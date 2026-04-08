export interface ChatMessageInterface{
    _id: string;
    conversationId: string;
    sender: string;
    content: string;

    type: "text" | "image";

    status: "sent" | "seen";

    sentAt: Date;
}

export interface ContactPersonInterface{
    _id: string;
    userName: string;
    profile?: string;
    firstName: string;
    lastName?:string;
}

export interface LastMessageInterface{
    messageType: "image" | "text";
    content: string;
    sender: string;
    sentAt: Date;
}

interface ContactInterface{
    conversationId: string,
    person: ContactPersonInterface,
    lastMessage : LastMessageInterface,
}

export interface GetContactsResponse{
    contacts:ContactInterface[];
}