import { Types } from "mongoose";
import { Conversation, ConversationInterface } from "../models/Conversation.model";


/**
 * @param uid1 and uid2 of two participating users
 * @returns Object of Type ConversationInterface
 */
export const getOrCreateConversation = async ( uid1: Types.ObjectId, uid2: Types.ObjectId) : Promise<ConversationInterface>=>{
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