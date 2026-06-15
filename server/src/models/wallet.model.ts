import {Schema, Types, Document, model} from "mongoose";

export interface WalletInterface{
    uid: Types.ObjectId,
    balance: number,
    totalSent: number,
    totalReceived: number,
}

const WalletSchema = new Schema<WalletInterface>({
    uid: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    balance:{
        type: Number,
        required: true,
    },
    totalSent:{
        type: Number,
    },
    totalReceived: {
        type: Number,
    }
});

export const Wallet = model<WalletInterface>("Wallet", WalletSchema);