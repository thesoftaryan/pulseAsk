import { Types } from "mongoose";
import { ChatMessageInterface, ChatMessage, ConversationInterface, Conversation } from "../models/Chat.model";
import { ApiError } from "../utils/error.util";
import { User } from "../models/User.model";
import { ContactInterface, ContactPersonInterface } from "../types/response/chat.type";
import { log } from "console";



/**
 * @param uid of the user
 * @returns a list of Users with whom the user had talked in the past
 */
export const getContactsService = async (uid: Types.ObjectId)=>{
    const conversations = await Conversation.find({
        participants: uid,
    }).populate("participants", "_id userName firstName lastName profile status lastSeen");

    // console.log(conversations);

    const contacts = [];
    for(let conversation of conversations){
        const conversationUser = ((conversation.participants[0]._id==uid)? 
            conversation.participants[1]
            :
            conversation.participants[0])as unknown as ContactPersonInterface;
        const obj = {
            conversationId: conversation._id,
            person: conversationUser,
            lastMessage : conversation.lastMessage,
            unreadCount: conversation.unreadCount,
            status: conversationUser.status,
            lastSeen: conversationUser.lastSeen,
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
    const user = await User.findById(userId).select("_id userName profile firstName lastName status lastSeen");
    const conversationId = await getConversationIdService(uid, userId);
    const obj = {
        conversationId,
        person: {
            _id: user?._id,
            firstName: user?.firstName,
            lastName: user?.lastName,
            profile: user?.profile,
            userName: user?.userName,
            status: user?.status,
            lastSeen: user?.lastSeen,
        },
        unreadCount:0,
    };
    return obj;
}


/**
 * @param conversationId of Type Types.ObjectId
 * @returns Object of Type FetchMessageService
 */
export const fetchMessagesService = async (uid:Types.ObjectId, conversationId: Types.ObjectId)=>{
    await markAsSeenService(uid, conversationId);
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
export const markAsSeenService = async (uid: Types.ObjectId, conversationId: Types.ObjectId)=>{
    const conversation = await Conversation.findById(conversationId);
    if(conversation && conversation.lastMessage?.sender != uid){
        await ChatMessage.updateMany({conversationId, status:"sent"}, {
            status: "seen",
        });
        const prevUnreadCount = conversation.unreadCount as number;
        conversation.unreadCount = 0;
        await conversation.save();
        // console.log("resetting the chatCount for user: ", uid);
        
        const user = await User.findOne({_id: uid});
        if(user?.unreadChatCount){
            user.unreadChatCount = 0;
            await user.save();
        }
    }
}

/**
 * @param conversationId of Type Types.ObjectId
 * @returns nothing
 */
export const resetUnreadCountService = async (conversationId: Types.ObjectId)=>{
    const conversation = await Conversation.findById(conversationId);
    if(conversation){
        conversation.unreadCount = 0;
        await conversation.save();
    }
}



/**
 * @param data of type any (as of now)
 * @returns the Object of type ChatMessageInterface
 */
export const createChatMessageService = async (data : any) : Promise<ChatMessageInterface>=>{
    const {senderId, receiverId, content, caption, type} = data;
    
    const conversation = await getOrCreateConversationService(senderId, receiverId);

    const message = await (await ChatMessage.create({
        conversationId: conversation._id,
        sender: senderId,
        content,
        caption,
        type,
        sentAt: new Date(),
    })).populate([
        {path: "sender", select:"_id userName profile firstName lastName"}
    ]);

    await Conversation.updateOne({conversationKey: conversation.conversationKey}, {
        lastMessage : {
            sender: message.sender,
            sentAt: message.sentAt,
            messageType:type,
            content,
            caption,
        },
        unreadCount : ((conversation.unreadCount as number)+1),
    });

    // console.log("receiverId to update: ",receiverId);
    // const user = await User.findOne({_id:receiverId});
    // console.log("user: ", user);
    
    if(senderId != receiverId){
        await User.updateOne({_id:receiverId}, {
            $inc: {unreadChatCount: 1}
        });
    }

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
    // console.log("created conversation: ", conversation);
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

/**
 * @param userId of Type Types.ObjectId
 * @returns nothing
 */
export const updateUserStatus = async (uid:string, status:string)=>{
    await User.updateOne({_id: uid}, {
        status,
        lastSeen: new Date(),
    });
}