import {Schema, Types, Document, model} from "mongoose";

interface TransactionInterface{
    senderId: Types.ObjectId,
    receiverId: Types.ObjectId,
    amount: Number,
}

const TransactionSchema = new Schema<TransactionInterface>({
    senderId:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    receiverId:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    amount: {
        type: Number,
        required: true,
    }
});

export const Transaction  = model<TransactionInterface>("Transaction", TransactionSchema);
