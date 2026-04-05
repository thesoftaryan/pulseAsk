import { ChatMessage, ChatMessageInterface } from "../models/ChatMessage.model";
import { Conversation } from "../models/Conversation.model";
import { getOrCreateConversation } from "./conversation.service";


/**
 * @param data of type any (as of now)
 * @returns the Object of type ChatMessageInterface
 */
export const createChatMessage = async (data : any) : Promise<ChatMessageInterface>=>{
    const {senderId, receiverId, content} = data;
    
    const conversation = await getOrCreateConversation(senderId, receiverId);

    const message = await ChatMessage.create({
        conversationId: conversation._id,
        sender: senderId,
        content,
        sentAt: new Date(),
    });

    return message;
}