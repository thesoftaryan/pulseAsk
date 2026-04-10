export interface PersonInterface{
    _id: string;
    userName: string;
    profile?: string;
    firstName: string;
    lastName?:string;
}

export interface ChatMessageInterface{
    _id: string;
    conversationId: string;
    sender: PersonInterface;
    content: string;

    type: "text" | "image";

    status: "sent" | "seen";

    sentAt: Date;
}


export interface LastMessageInterface{
    messageType: "image" | "text";
    content: string;
    sender: string;
    sentAt: Date;
}

export interface ContactInterface{
    conversationId: string,
    person: PersonInterface,
    lastMessage? : LastMessageInterface,
}

export interface GetContactsResponse{
    contacts:ContactInterface[];
}

export interface FetchMessagesResponse{
    messages: ChatMessageInterface[];
}

export interface GetUserContactDetailsResponse extends ContactInterface{

}