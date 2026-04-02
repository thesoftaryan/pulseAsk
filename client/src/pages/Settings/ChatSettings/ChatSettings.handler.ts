import { useAppDispatch } from "../../../hooks/store.hook";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service"
import { updateChatProfileService } from "../../../services/settings/chatSettings.service";
import { updateChatPreferences } from "../../../store/auth/auth.slice";
import type { UpdateChatProfilePayload } from "../../../types/ApiRequest/setting.type";
import type { UpdateChatProfileResponse } from "../../../types/ApiResponse/setting.type";
import type { ChatPreferencesInterface } from "../../../types/ApiResponse/user.type";
import { showToast } from "../../../utils/toast.util";


export const useChatSettingsHandler = (
    setChatPreferences: React.Dispatch<React.SetStateAction<ChatPreferencesInterface>>,
)=>{
    const dispatch = useAppDispatch();
    const updateChatProfile = async (preferences : UpdateChatProfilePayload)=>{
        try{
            const response = await updateChatProfileService(preferences);
            const result = parseSuccessResponse<UpdateChatProfileResponse>(response);
            dispatch(updateChatPreferences({...(result.data)}));
            setChatPreferences(result.data!);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    return {
        updateChatProfile,
    }
}