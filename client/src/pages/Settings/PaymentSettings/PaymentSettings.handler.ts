import { useAppDispatch } from "../../../hooks/store.hook";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service"
import { updatePaymentProfileService } from "../../../services/settings/paymentSettings.service";
import { updatePaymentPreferences } from "../../../store/auth/auth.slice";
import type { UpdatePaymentProfileResponse } from "../../../types/ApiResponse/setting.type";
import { showToast } from "../../../utils/toast.util";


export const usePaymentSettingsHandler = (
    setPaymentActive: React.Dispatch<React.SetStateAction<boolean>>,
)=>{
    const dispatch = useAppDispatch();
    const updatePaymentProfile = async (enablePayment : boolean)=>{
        try{
            // console.log("updating value to : ", enablePayment);
            
            const response = await updatePaymentProfileService({enablePayment});
            const result = parseSuccessResponse<UpdatePaymentProfileResponse>(response);
            dispatch(updatePaymentPreferences({...(result.data)}));
            setPaymentActive(result.data?.enablePayment??false);
            showToast.success(result.message);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    return {
        updatePaymentProfile,
    }
}