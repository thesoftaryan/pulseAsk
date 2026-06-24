import { getTransactionsAPI, getWalletStatsAPI, sendPaymentAPI } from "../api/wallet.api"

export const sendPaymentService = (data : any)=>{
    return sendPaymentAPI(data);
}

export const getWalletStatsService = ()=>{
    return getWalletStatsAPI();
}

export const getTransactionsService = ()=>{
    return getTransactionsAPI();
}