import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service"
import { updateBasicProfileService, updateSocialProfileService } from "../../../services/setting/accountSettings.service";
import type { UpdateBasicProfilePayload, UpdateSocialProfilePayload } from "../../../types/ApiRequest/setting.type"
import type { UpdateBasicProfileResponse, UpdateSocialProfileResponse } from "../../../types/ApiResponse/setting.type";
import type { TagInterface } from "../../../types/ApiResponse/tag.type";
import { showToast } from "../../../utils/toast.util";
import { basicProfileValidator, socialProfileValidator } from "./AccountSettings.validator";


export const useAccountSettingsHandler = (
    setBasicProfile: React.Dispatch<React.SetStateAction<UpdateBasicProfilePayload>>,
    setSocialProfile: React.Dispatch<React.SetStateAction<UpdateSocialProfilePayload>>,
    setKTags: React.Dispatch<React.SetStateAction<TagInterface[]>>,
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

    const addKTagHandler = async (
        setKTagState: React.Dispatch<React.SetStateAction<{
            adding: boolean;
            removing: boolean;
        }>>,
    ) =>{
        try{
            return true;
            // const response = await removeKTagService();
            // const result = parseSuccessResponse<TagInterface>();
            // setKTags((state)=>{return {...state, result.data?}});
        }catch(error){
            setKTagState((state)=>{return {removing: state.removing, adding : true}});
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setKTagState((state)=>{return {removing: state.removing, adding : false}});
        }
    }

    const removeKTagHandler = async (
        setKTagState: React.Dispatch<React.SetStateAction<{
            adding: boolean;
            removing: boolean;
        }>>,
    ) =>{
        try{
            setKTagState((state)=>{return {adding: state.adding, removing : true}});
            // const response = await removeKTagService();
            // const result = parseSuccessResponse();
            // setKTags((state)=>state.filter((kTag)=>kTag._id!==result.data));
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setKTagState((state)=>{return {adding: state.adding, removing : false}});
        }
    }

    return {
        UpdateBasicProfileHandler,
        updateSocialProfileHandler,
        addKTagHandler,
        removeKTagHandler,
    }
}