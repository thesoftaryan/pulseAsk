import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service"
import { updateBasicProfileService, updateSocialProfileService } from "../../../services/setting/accountSettings.service";
import type { UpdateBasicProfilePayload, UpdateSocialProfilePayload } from "../../../types/ApiRequest/setting.type"
import type { UpdateBasicProfileResponse, UpdateSocialProfileResponse } from "../../../types/ApiResponse/setting.type";
import { showToast } from "../../../utils/toast.util";
import { basicProfileValidator, socialProfileValidator } from "./AccountSettings.validator";


export const useAccountSettingsHandler = (
    setBasicProfile: React.Dispatch<React.SetStateAction<UpdateBasicProfilePayload>>,
    setSocialProfile: React.Dispatch<React.SetStateAction<UpdateSocialProfilePayload>>,
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
)=>{
    const UpdateBasicProfileHandler = async (data : UpdateBasicProfilePayload)=>{
        try{

            const errors = basicProfileValidator(data);
            if(Object.keys(errors).length!==0){
                setErrors(errors);return;
            }
            const response = await updateBasicProfileService(data);
            const result = parseSuccessResponse<UpdateBasicProfileResponse>(response);
            setBasicProfile(result.data!);
            showToast.success(result.message);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    const updateSocialProfileHandler = async (data : UpdateSocialProfilePayload)=>{
        const errors = socialProfileValidator(data);
        if(Object.keys(errors).length!==0){
            setErrors(errors);return;
        }
        try{
            const response = await updateSocialProfileService(data);
            const result = parseSuccessResponse<UpdateSocialProfileResponse>(response);
            setSocialProfile(result.data!);
            showToast.success(result.message);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    return {
        UpdateBasicProfileHandler,
        updateSocialProfileHandler,
    }
}