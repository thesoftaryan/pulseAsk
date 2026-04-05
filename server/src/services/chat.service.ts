import { Types } from "mongoose";
import { ChatMessageInterface, ChatMessage } from "../models/ChatMessage.model";
import { ConversationInterface, Conversation } from "../models/Conversation.model";



/**
 * @param uid of the user
 * @returns a list of Users with whom the user had talked in the past
 */
export const getContactsService = async (uid: Types.ObjectId)=>{
    
}





/**
 * @param data of type any (as of now)
 * @returns the Object of type ChatMessageInterface
 */
export const createChatMessageService = async (data : any) : Promise<ChatMessageInterface>=>{
    const {senderId, receiverId, content} = data;
    
    const conversation = await getOrCreateConversationService(senderId, receiverId);

    const message = await ChatMessage.create({
        conversationId: conversation._id,
        sender: senderId,
        content,
        sentAt: new Date(),
    });

    return message;
}


/**
 * @param uid1 and uid2 of two participating users
 * @returns Object of Type ConversationInterface
 */
export const getOrCreateConversationService = async ( uid1: Types.ObjectId, uid2: Types.ObjectId) : Promise<ConversationInterface>=>{
    const participants = [uid1, uid2].sort((a, b)=>{
        return a.toString().localeCompare(b.toString());
    });

    let conversation = await Conversation.findOne({
        participants: participants,
    });

    if(!conversation){
        conversation = await Conversation.create({
            participants,
        });
    }
    return conversation;
}