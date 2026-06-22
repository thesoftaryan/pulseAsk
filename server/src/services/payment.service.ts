import { Types } from "mongoose";
import { Transaction } from "../models/transaction.model";
import { Wallet } from "../models/wallet.model";
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes.constants";


export const sendPaymentService = async (uid:Types.ObjectId, data : any)=>{
    const {amount, receiver} = data;
    let walletReceiver = await Wallet.findOne({uid: receiver});
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
        $inc:{balance: -amount},
    });
    await walletReceiver.updateOne({
        $inc: {balance: amount},
    });
    await Transaction.create({
        amount,
        receiverId: receiver,
        senderId: uid,
    });
}