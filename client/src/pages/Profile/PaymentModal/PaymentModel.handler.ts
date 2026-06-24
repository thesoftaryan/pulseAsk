import { useState } from "react";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service"
import { sendPaymentService } from "../../../services/wallet.service";
import { showToast } from "../../../utils/toast.util";

export const usePaymentModalHandler = (
    setOpenPaymentModal : React.Dispatch<React.SetStateAction<boolean>>,
)=>{
    const [sending, setSending] = useState(false);
    const sendPayment = async (amount: number, receiver:string)=>{
        try{
            setSending(true);
            const response = await sendPaymentService({amount, receiver});
            const result = parseSuccessResponse(response);
            showToast.success(result.message);
            setOpenPaymentModal(false);
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
        }finally{
            setSending(false);
        }
    }

    return {
        sending,
        sendPayment,
    }
}