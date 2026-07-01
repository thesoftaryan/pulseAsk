import { Types } from "mongoose";


export interface AnswerNotificationPayload{
    senderId: Types.ObjectId,
    receiverId: Types.ObjectId,
    answerId: Types.ObjectId,
    questionId: Types.ObjectId,
}

export interface TransactionNotificationPayload{
    senderId: Types.ObjectId,
    receiverId: Types.ObjectId,
    amount: number,
}