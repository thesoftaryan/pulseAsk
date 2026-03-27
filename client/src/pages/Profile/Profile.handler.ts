import { useSafeNavigate } from "../../hooks/useSafeNavigate.hook";
import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service";
import { fetchProfileService } from "../../services/profile/fetchProfile.service";
import type { UserInterface, UserResponse } from "../../types/ApiResponse/user.type";
import { showToast } from "../../utils/toast.util"


export const useProfileHandler = (
    setUser: React.Dispatch<React.SetStateAction<Partial<UserInterface>>>,
    setFetchingProfile : React.Dispatch<React.SetStateAction<boolean>>,
)=>{


    const {backNavigate} = useSafeNavigate();

    const fetchProfileHandler = async (userName? : string)=>{
        if(!userName || userName.length<3){
            showToast.error("Profile not found");
            backNavigate();
            return;
        }
        try{
            setFetchingProfile(true);
            const reqObj = {
                userName,
            }
            const response = await fetchProfileService(reqObj);
            const result = parseSuccessResponse<UserResponse>(response);
            // console.log("user: ");
            
            setUser(result.data?.user??{});
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setFetchingProfile(false);
        }
    }


    return {
        fetchProfileHandler,
    }
}