import type { SendPaymentPayload } from "../types/ApiRequest/wallet.type";
import api from "./axios";

export const sendPaymentAPI = (data : SendPaymentPayload)=>{
    return api.post("/wallet/send", data);
}

export const getWalletStatsAPI = ()=>{
    return api.get("/wallet/getStats");
}

export const getTransactionsAPI = ()=>{
    return api.get("/wallet/getTransactions");
}