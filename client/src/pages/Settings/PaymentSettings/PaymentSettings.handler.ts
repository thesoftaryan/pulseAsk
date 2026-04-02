import { useAppDispatch } from "../../../hooks/store.hook";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service"
import { updatePaymentProfileService } from "../../../services/settings/paymentSettings.service";
import { updatePaymentPreferences } from "../../../store/auth/auth.slice";
import type { UpdatePaymentProfileResponse } from "../../../types/ApiResponse/setting.type";
import type { PaymentPreferencesInterface } from "../../../types/ApiResponse/user.type";
import { showToast } from "../../../utils/toast.util";


export const usePaymentSettingsHandler = (
    setPaymentPreferences: React.Dispatch<React.SetStateAction<PaymentPreferencesInterface>>,
)=>{
    const dispatch = useAppDispatch();
    const updatePaymentProfile = async (enablePayment : boolean)=>{
        try{
            // console.log("updating value to : ", enablePayment);
            const response = await updatePaymentProfileService({enablePayment});
            const result = parseSuccessResponse<UpdatePaymentProfileResponse>(response);
            dispatch(updatePaymentPreferences(result.data));
            setPaymentPreferences(result.data!);
            // showToast.success(result.message);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    return {
        updatePaymentProfile,
    }
}