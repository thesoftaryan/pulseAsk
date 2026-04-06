import { Types } from "mongoose";
import { ChatMessageInterface, ChatMessage } from "../models/ChatMessage.model";
import { ConversationInterface, Conversation } from "../models/Conversation.model";



/**
 * @param uid of the user
 * @returns a list of Users with whom the user had talked in the past
 */
export const getContactsService = async (uid: Types.ObjectId)=>{
    const conversations = await Conversation.find({
        participants: uid,
    }).populate("participants", "_id userName firstName lastName profile");

    console.log(conversations);

    let contacts = [];
    for(let conversation of conversations){
        const obj = {
            conversationId: conversation._id,
            person: 
            (conversation.participants[0]._id==uid)? 
            conversation.participants[1]
            :
            conversation.participants[0]
            ,
            lastMessage : conversation.lastMessage,
        };
        contacts.push(obj);
    }
    return contacts;
}


/**
 * @param conversationId of Type Types.ObjectId
 * @returns Array of Objects of type ChatMessage
 */
export const fetchMessagesService = async (conversationId: Types.ObjectId)=>{
    const messages = await ChatMessage.find({
        conversationId,
    }).sort({sentAt:1});
    return messages;
}



/**
 * @param data of type any (as of now)
 * @returns the Object of type ChatMessageInterface
 */
export const createChatMessageService = async (data : any) : Promise<ChatMessageInterface>=>{
    const {senderId, receiverId, content} = data;
    
    console.log("data received: ", data);

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

    console.log("participants: ", participants);

    let conversation = await Conversation.findOne({
        participants,
    });

    if(!conversation){
        conversation = await Conversation.create({
            participants,
        });
    }
    console.log("created conversation: ", conversation);
    return conversation;
}