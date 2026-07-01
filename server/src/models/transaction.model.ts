import {Schema, Types, Document, model} from "mongoose";

export interface TransactionInterface{
    sender: Types.ObjectId,
    receiver: Types.ObjectId,
    amount: Number,
}

const TransactionSchema = new Schema<TransactionInterface>({
    sender:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    receiver:{
        type: Schema.Types.ObjectId,
        ref:"User",
    },
    amount: {
        type: Number,
        required: true,
    }
}, {timestamps:true});

export const Transaction  = model<TransactionInterface>("Transaction", TransactionSchema);
