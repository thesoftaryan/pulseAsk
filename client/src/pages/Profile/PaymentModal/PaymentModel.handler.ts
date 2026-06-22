import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service"
import { sendPaymentService } from "../../../services/payment.service";
import { showToast } from "../../../utils/toast.util";

export const usePaymentModalHandler = (
    setOpenPaymentModal : React.Dispatch<React.SetStateAction<boolean>>,
)=>{
    const sendPayment = async (amount: number, receiver:string)=>{
        try{
            const response = await sendPaymentService({amount, receiver});
            const result = parseSuccessResponse(response);
            showToast.success(result.message);
            setOpenPaymentModal(false);
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
        }
    }

    return {
        sendPayment,
    }
}