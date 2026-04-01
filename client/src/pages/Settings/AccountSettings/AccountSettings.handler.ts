import { useAppDispatch } from "../../../hooks/store.hook";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service"
import { addKTagService, removeKTagService, removeUserProfileImageService, updateBasicProfileService, updateSocialProfileService, updateUserProfileImageService } from "../../../services/settings/accountSettings.service";
import { addKTag, removeKTag, updateUserProfileImage } from "../../../store/auth/auth.slice";
import type { UpdateBasicProfilePayload, UpdateSocialProfilePayload, UpdateUserProfileImagePayload } from "../../../types/ApiRequest/setting.type"
import type { AddKTagResponse,  UpdateBasicProfileResponse,  UpdateSocialProfileResponse, UpdateUserProfileImageResponse } from "../../../types/ApiResponse/setting.type";
import { showToast } from "../../../utils/toast.util";
import { basicProfileValidator, socialProfileValidator } from "./AccountSettings.validator";


export const useAccountSettingsHandler = (
    setBasicProfile: React.Dispatch<React.SetStateAction<UpdateBasicProfilePayload>>,
    setSocialProfile: React.Dispatch<React.SetStateAction<UpdateSocialProfilePayload>>,
    setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>,
)=>{

    const dispatch = useAppDispatch();

    const removeUserProfileImageHandler = async ()=>{
        try{
            const response = await removeUserProfileImageService();
            const result = parseSuccessResponse(response);
            dispatch(updateUserProfileImage({imageUrl: null}));
            showToast.success(result.message);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    const updateUserProfileImageHandler = async (data : UpdateUserProfileImagePayload)=>{
        try{
            const response = await updateUserProfileImageService(data);
            const result = parseSuccessResponse<UpdateUserProfileImageResponse>(response);
            dispatch(updateUserProfileImage({imageUrl: data.imageUrl}));
            showToast.success(result.message);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    const updateBasicProfileHandler = async (data : UpdateBasicProfilePayload)=>{
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
        setTagName: React.Dispatch<React.SetStateAction<string>>,
        name: string,
    ) =>{
        try{
            name = name.trim();
            if(!name || name.length<3){
                showToast.error("Tag must be of atleast 3 characters");
                return;
            }
            setKTagState((state)=>{return {removing: state.removing, adding : true}});
            // console.log(new Date());
            const response = await addKTagService({name});
            const result = parseSuccessResponse<AddKTagResponse>(response);
            // console.log(new Date());
            setTagName("");
            dispatch(addKTag({tag: result.data}));
            // setKTags((state)=>{return [...state, result.data!]});
            // await dispatch(checkAuthThunk()).unwrap();
        }catch(error){
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
        kTid: string,
    ) =>{
        try{
            setKTagState((state)=>{return {adding: state.adding, removing : true}});
            // console.log(new Date());
            await removeKTagService({kTid});
            // console.log(new Date());
            dispatch(removeKTag({kTid}));
            // const response = await removeKTagService({kTid});
            // const result = parseSuccessResponse<RemoveKTagResponse>(response);
            // setKTags((state)=>state.filter((kTag)=>kTag._id!==kTid));
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setKTagState((state)=>{return {adding: state.adding, removing : false}});
        }
    }

    return {
        removeUserProfileImageHandler,
        updateUserProfileImageHandler,
        updateBasicProfileHandler,
        updateSocialProfileHandler,
        addKTagHandler,
        removeKTagHandler,
    }
}