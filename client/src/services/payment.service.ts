import { sendPaymentAPI } from "../api/payment.api"

export const sendPaymentService = (data : any)=>{
    return sendPaymentAPI(data);
}