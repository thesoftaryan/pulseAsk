import { Request, Response } from "express"
import { getTransactionsService, getWalletStatsService, sendPaymentService } from "../services/wallet.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";
import { SendPaymentPayload } from "../types/wallet.type";
import { FetchTransactionsResponse, WalletStatsResponse } from "../types/response/wallet.type";


export const sendPaymentController = async (req: Request, res:Response)=>{
    const data = req.body as SendPaymentPayload;
    await sendPaymentService(req.user?.uid!, data);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Payment sent",
        {},
    );
}

export const getWalletStatsController = async (req:Request, res:Response)=>{
    const wallet = await getWalletStatsService(req.user?.uid!);
    const response:WalletStatsResponse = {wallet};
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Wallet fetched",
        response,
    );
}

export const getTransactionsController = async (req:Request, res:Response)=>{
    const transactions = await getTransactionsService(req.user?.uid!);
    const response:FetchTransactionsResponse = {transactions};
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Transactions fetched",
        response,
    );
}