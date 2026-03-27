import { useSafeNavigate } from "../../hooks/useSafeNavigate.hook";
import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service";
import { fetchProfileService } from "../../services/profile/fetchProfile.service";
import type { AnswerInterface } from "../../types/ApiResponse/answer.type";
import type { FetchProfileResponse } from "../../types/ApiResponse/profile.type";
import type { QuestionInterface } from "../../types/ApiResponse/question.type";
import type { UserInterface } from "../../types/ApiResponse/user.type";
import { showToast } from "../../utils/toast.util"


export const useProfileHandler = (
    setUser: React.Dispatch<React.SetStateAction<Partial<UserInterface>>>,
    setQuestions: React.Dispatch<React.SetStateAction<QuestionInterface[]>>,
    setAnswers: React.Dispatch<React.SetStateAction<AnswerInterface[]>>,
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
            const result = parseSuccessResponse<FetchProfileResponse>(response);
            // console.log("user: ");
            
            setUser(result.data?.user??{});
            setQuestions(result.data?.questions??[]);
            setAnswers(result.data?.answers??[]);
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