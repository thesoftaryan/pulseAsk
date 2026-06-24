import { Request, Response } from "express"
import { getTransactionsService, getWalletStatsService, sendPaymentService } from "../services/wallet.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";


export const sendPaymentController = async (req: Request, res:Response)=>{
    const data = req.body;
    await sendPaymentService(req.user?.uid!, data);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Payment sent",
        {},
    );
}

export const getWalletStatsController = async (req:Request, res:Response)=>{
    const response = await getWalletStatsService(req.user?.uid!);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Wallet fetched",
        response,
    );
}

export const getTransactionsController = async (req:Request, res:Response)=>{
    const transactions = await getTransactionsService(req.user?.uid!);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Transactions fetched",
        {transactions},
    );
}