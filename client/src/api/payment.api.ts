import api from "./axios";

export const sendPaymentAPI = (data : any)=>{
    return api.post("/payment/send", data);
}