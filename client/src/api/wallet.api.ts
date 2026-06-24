import api from "./axios";

export const sendPaymentAPI = (data : any)=>{
    return api.post("/wallet/send", data);
}

export const getWalletStatsAPI = ()=>{
    return api.get("/wallet/getStats");
}

export const getTransactionsAPI = ()=>{
    return api.get("/wallet/getTransactions");
}