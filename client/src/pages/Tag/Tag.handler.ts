import { useState } from "react";
import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service"
import { fetchQuestionsByTagService, fetchTagBySlugService } from "../../services/tag.service";
// import type { QuestionInterface } from "../../types/ApiResponse/question.type";
// import type { TagInterface } from "../../types/ApiResponse/tag.type";
import { showToast } from "../../utils/toast.util";
import type { QuestionInterface } from "../../types/ApiResponse/question.type";
import type { QuestionsByTagResponse, TagBySlugResponse, TagInterface } from "../../types/ApiResponse/tag.type";


export const useTagHandler = (
    setQuestions: React.Dispatch<React.SetStateAction<QuestionInterface[]>>,
    setTag: React.Dispatch<React.SetStateAction<TagInterface | undefined>>,
)=>{

    const [fetchingTag, setFetchingTag] = useState(false);
    const [fetchingQuestions, setFetchingQuestions] = useState(false);

    const initPage = async (slug:string)=>{
        try{
            setFetchingTag(true);
            const tagResponse = await fetchTagBySlugService({tagSlug: slug});
            const tagResult = parseSuccessResponse<TagBySlugResponse>(tagResponse);
            const tag = tagResult.data?.tag;
            setTag(tag);
            setFetchingTag(false);
            setFetchingQuestions(true);
            const questionsResponse = await fetchQuestionsByTagService({tagId: tag?._id??""});
            const result = parseSuccessResponse<QuestionsByTagResponse>(questionsResponse);
            setQuestions(result.data?.questions??[]);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setFetchingQuestions(false);
            setFetchingTag(false);
        }
    }

    return {
        fetchingQuestions,
        fetchingTag,
        initPage,
    }

}