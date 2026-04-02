import { updatePaymentProfileAPI } from "../../api/setting.api";
import type { UpdatePaymentProfilePayload } from "../../types/ApiRequest/setting.type";

export const updatePaymentProfileService = (data : UpdatePaymentProfilePayload)=>{
    return updatePaymentProfileAPI(data);
}