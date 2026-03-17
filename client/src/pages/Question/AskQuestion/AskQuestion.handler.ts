// import { useAppDispatch } from "../../../hooks/store.hook"
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import { generateTagService } from "../../../services/question/generateTag.service";
import type { GenerateTagPayload } from "../../../types/ApiRequest/tag.type";
import type { TagResponseData } from "../../../types/ApiResponse/index.type";
import type { TagInterface } from "../../../types/ApiResponse/tag.type";
import { showToast } from "../../../utils/toast.util";


export const useAskQuestionHandler = ()=>{
    // const dispatch = useAppDispatch();

    const generateTagHandler = async (data : GenerateTagPayload, 
        setTags : React.Dispatch<React.SetStateAction<Partial<TagInterface>[]>>, 
        setGeneratingTags: React.Dispatch<React.SetStateAction<boolean>>)=>{
        try{
            setGeneratingTags(true);
            const response = await generateTagService(data);
            const result = parseSuccessResponse<TagResponseData>(response);
            // console.log(result.data?.tags);
            // console.log(response);
            setTags(result.data?.tags??[]);
            showToast.success(result.message);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setGeneratingTags(false);
        }
    }

    return {
        generateTagHandler,
    }
}