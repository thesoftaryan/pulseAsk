// import { useAppDispatch } from "../../../hooks/store.hook"
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import { generateTagService } from "../../../services/question/generateTag.service";
import type { GenerateTagPayload } from "../../../types/ApiRequest/tag.type";
import type { TagResponseData } from "../../../types/ApiResponse/index.type";
import { showToast } from "../../../utils/toast.util";


export const useAskQuestionHandler = ()=>{
    // const dispatch = useAppDispatch();

    const generateTagHandler = async (data : GenerateTagPayload)=>{
        try{
            const response = await generateTagService(data);
            const result = parseSuccessResponse<TagResponseData>(response);
            console.log(result.data?.tags);
            // console.log(response);
            showToast.success(result.message);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    return {
        generateTagHandler,
    }
}