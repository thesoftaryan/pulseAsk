import { Types } from "mongoose";
import { Transaction } from "../models/transaction.model";
import { Wallet } from "../models/wallet.model";
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes.constants";
import { appEventEmitter } from "../emitter/emitter";
import { User, UserInterface } from "../models/User.model";


export const sendPaymentService = async (uid:Types.ObjectId, data : any)=>{
    const {amount, receiver} = data;
    const user = await User.findById(receiver);
    if(!user?.paymentPreferences.enablePayment){
        throw new ApiError(
            STATUS.CLIENT_ERROR.FORBIDDEN,
            `${user?.firstName} isn't accepting payments`,
        );
    }
    let walletReceiver = await Wallet.findOne({uid: receiver}).populate([
        {path: "uid", select: "paymentPreferences"},
    ]);
    let walletSender = await Wallet.findOne({uid: uid});
    if(!walletReceiver){
        walletReceiver = await Wallet.create({
            uid: receiver,
            balance: 1000,
        });
    }
    if(!walletSender){
        walletSender = await Wallet.create({
            uid,
            balance: 1000,
        });
    }
    walletSender = await Wallet.findOne({
        uid:uid,
        balance: {$gte: amount}
    });
    if(!walletSender){
        throw new ApiError(
            STATUS.CLIENT_ERROR.BAD_REQUEST,
            "Insufficient balance",
        );
    }
    await walletSender.updateOne({
        $inc:{balance: -amount, totalSent: amount},
    });
    await walletReceiver.updateOne({
        $inc: {balance: amount, totalReceived: amount},
    });
    await Transaction.create({
        amount,
        receiver: receiver,
        sender: uid,
    });

    if(user.notificationPreferences.payment){
        appEventEmitter.emit(
            "payment.made",
            {
                senderId: uid,
                receiverId: receiver,
                amount: amount,
            }
        );
    }

}

export const getWalletStatsService = async (uid:Types.ObjectId)=>{
    let wallet = await Wallet.findOne({uid: uid});
    if(!wallet){
        wallet = await Wallet.create({
            uid: uid,
            balance:1000,
        });
    }
    return wallet;
}

export const getTransactionsService = async (uid:Types.ObjectId)=>{
    const transactions = await Transaction.find({
        $or: [
            {sender: uid},
            {receiver: uid},
        ]
    }).populate([
        {path: "sender", select:"_id userName profile firstName lastName"},
        {path: "receiver", select:"_id userName profile firstName lastName"},
    ]);
    return transactions;
}