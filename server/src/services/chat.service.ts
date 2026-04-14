import { Types } from "mongoose";
import { ChatMessageInterface, ChatMessage, ConversationInterface, Conversation } from "../models/Chat.model";
import { ApiError } from "../utils/error.util";
import { User } from "../models/User.model";
import { ContactInterface } from "../types/response/chat.type";
import { log } from "console";



/**
 * @param uid of the user
 * @returns a list of Users with whom the user had talked in the past
 */
export const getContactsService = async (uid: Types.ObjectId)=>{
    const conversations = await Conversation.find({
        participants: uid,
    }).populate("participants", "_id userName firstName lastName profile");

    // console.log(conversations);

    const contacts = [];
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
    // console.log("contacts for user: ", uid, " -> ", contacts);
    
    return contacts;
}

/**
 * @param UserId whose contact details is required
 * @returns contact details of required user
 */
export const userContactDetailsService = async (uid:Types.ObjectId, userId: Types.ObjectId)=>{
    const user = await User.findById(userId).select("_id userName profile firstName lastName");
    const conversationId = await getConversationIdService(uid, userId);
    const obj = {
        conversationId,
        person: {
            _id: user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            profile: user?.profile,
            userName: user?.userName,
        },
    };
    return obj;
}


/**
 * @param conversationId of Type Types.ObjectId
 * @returns Object of Type FetchMessageService
 */
export const fetchMessagesService = async (conversationId: Types.ObjectId)=>{
    await markAsSeen(conversationId);
    const messages = await ChatMessage.find({
        conversationId,
    }).sort({sentAt:1}).populate([
        {path: "sender", select:"_id userName profile firstName lastName"}
    ]);
    return messages;
}

/**
 * @param conversationId of Type Types.ObjectId
 * @returns nothing
 */
export const markAsSeen = async (conversationId: Types.ObjectId)=>{
    const conversation = await Conversation.findById(conversationId);
    if(conversation){
        await ChatMessage.updateMany({conversationId, status:"sent"}, {
            status: "seen",
        });
        conversation.unreadCount = 0;
        await conversation.save();
    }
}

/**
 * @param conversationId of Type Types.ObjectId
 * @returns nothing
 */
export const updateUnreadCount = async (conversationId: Types.ObjectId, change: number)=>{
    const conversation = await Conversation.findById(conversationId);
    if(conversation){
        conversation.unreadCount = (change==-1)?0:((conversation.unreadCount as number)+1);
        await conversation.save();
    }
}



/**
 * @param data of type any (as of now)
 * @returns the Object of type ChatMessageInterface
 */
export const createChatMessageService = async (data : any) : Promise<ChatMessageInterface>=>{
    const {senderId, receiverId, content} = data;
    
    // if(!)
    // console.log("data received: ", data);

    const conversation = await getOrCreateConversationService(senderId, receiverId);

    const message = await (await ChatMessage.create({
        conversationId: conversation._id,
        sender: senderId,
        content,
        sentAt: new Date(),
    })).populate([
        {path: "sender", select:"_id userName profile firstName lastName"}
    ]);


    await Conversation.updateOne({conversationKey: conversation.conversationKey}, {
        lastMessage : {
            sender: message.sender,
            sentAt: message.sentAt,
            content: content,
        },
    });

    // await conversation.save();

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

    // console.log("participants: ", participants);

    const conversationKey = `${participants[0]}_${participants[1]}`;
    let conversation = await Conversation.findOne({
        conversationKey,
    });

    if(!conversation){
        conversation = await Conversation.create({
            conversationKey,
            participants,
        });
    }
    console.log("created conversation: ", conversation);
    return conversation;
}

/**
 * @param uid1 and uid2 of two participating users
 * @returns Object of Type ConversationInterface
 */
export const getConversationIdService = async ( uid1: Types.ObjectId, uid2: Types.ObjectId) : Promise<string>=>{
    const participants = [uid1, uid2].sort((a, b)=>{
        return a.toString().localeCompare(b.toString());
    });

    // console.log("participants: ", participants);

    const conversationKey = `${participants[0]}_${participants[1]}`;

    let conversation = await Conversation.findOne({
        conversationKey,
    });

    // console.log("created conversation: ", conversation);
    return conversation?._id.toString()??"new_conversation";
}