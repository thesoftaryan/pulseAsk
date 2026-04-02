import { useAppDispatch } from "../../../hooks/store.hook";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service"
import { updateNotificationProfileService } from "../../../services/settings/notificationSettings.service";
import { updateNotificationPreferences } from "../../../store/auth/auth.slice";
import type { UpdateNotificationProfilePayload } from "../../../types/ApiRequest/setting.type";
import type { UpdateNotificationProfileResponse } from "../../../types/ApiResponse/setting.type";
import type { NotificationPreferencesInterface } from "../../../types/ApiResponse/user.type";
import { showToast } from "../../../utils/toast.util";


export const useNotificationSettingsHandler = (
    setNotificationPreferences: React.Dispatch<React.SetStateAction<NotificationPreferencesInterface>>,
)=>{
    const dispatch = useAppDispatch();
    const updateNotificationProfile = async (preferences : UpdateNotificationProfilePayload)=>{
        try{
            const response = await updateNotificationProfileService(preferences);
            const result = parseSuccessResponse<UpdateNotificationProfileResponse>(response);
            dispatch(updateNotificationPreferences({...(result.data)}));
            setNotificationPreferences(result.data!);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    return {
        updateNotificationProfile,
    }
}