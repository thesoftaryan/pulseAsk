import { Types } from "mongoose";

export interface SendPaymentPayload{
    amount: number;
    receiver: Types.ObjectId;    
}