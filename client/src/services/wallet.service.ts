import { getTransactionsAPI, getWalletStatsAPI, sendPaymentAPI } from "../api/wallet.api"
import type { SendPaymentPayload } from "../types/ApiRequest/wallet.type";

export const sendPaymentService = (data : SendPaymentPayload)=>{
    return sendPaymentAPI(data);
}

export const getWalletStatsService = ()=>{
    return getWalletStatsAPI();
}

export const getTransactionsService = ()=>{
    return getTransactionsAPI();
}