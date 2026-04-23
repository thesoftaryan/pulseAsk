import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service"
import { fetchQuestionsByTagService, fetchTagBySlugService } from "../../services/tag.service";
// import type { QuestionInterface } from "../../types/ApiResponse/question.type";
// import type { TagInterface } from "../../types/ApiResponse/tag.type";
import { showToast } from "../../utils/toast.util";


export const useTagHandler = (
    setQuestions: React.Dispatch<any>,
    setTag: React.Dispatch<any>,
)=>{

    const initPage = async (slug:string)=>{
        try{
            const tagResponse = await fetchTagBySlugService({tagSlug: slug});
            const tagResult = parseSuccessResponse<any>(tagResponse);
            const tag = tagResult.data.tag;
            setTag(tag);
            const questionsResponse = await fetchQuestionsByTagService({tagId: tag?._id});
            const result = parseSuccessResponse<any>(questionsResponse);
            setQuestions(result.data.questions);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    return {
        initPage,
    }

}