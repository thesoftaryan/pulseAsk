// import { useAppDispatch } from "../../../hooks/store.hook"
// import { uploadImageHandler } from "../../../components/common/TextEditor/ImageHandler/Image.handler";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../routes/routesConstants";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import { askQuestionService } from "../../../services/question/askQuestion.service";
import { generateTagService } from "../../../services/tag.service";
import type { AskQuestionPayload } from "../../../types/ApiRequest/question.type";
import type { GenerateTagPayload, TagPayload } from "../../../types/ApiRequest/tag.type";
import type { AskQuestionResponse } from "../../../types/ApiResponse/question.type";
import type { TagResponse } from "../../../types/ApiResponse/tag.type";
import { generateTagColor } from "../../../utils/tag.util";
import { showToast } from "../../../utils/toast.util";
import { askQuestionValidator } from "./AskQuestion.validator";


export const useAskQuestionHandler = (
    setErrors: React.Dispatch<React.SetStateAction<Partial<AskQuestionPayload>>>,
    setTags : React.Dispatch<React.SetStateAction<TagPayload[]>>,
    setGeneratingTags: React.Dispatch<React.SetStateAction<boolean>>,
    setPostingQuestion: React.Dispatch<React.SetStateAction<boolean>>,
)=>{
    // const dispatch = useAppDispatch();

    const {safeNavigate} = useSafeNavigate();

    const askQuestionHandler = async (data : AskQuestionPayload)=>{
        const errors = askQuestionValidator(data);

        if(Object.keys(errors).length !== 0){
            setErrors(errors);
            return;
        }

        
        try{
            setPostingQuestion(true);
            // console.log(data.tags);
            // if(!data.tags || data.tags.length===0){
            //     data.tags = await generateTagHandler({title: data.title??"", description: data.description??""});
            // }
            // console.log(data.tags);
            console.log("request data: ", data);
            const response = await askQuestionService(data);
            const result = parseSuccessResponse<AskQuestionResponse>(response);
            console.log("result: ", result);
            showToast.success(result.message);
            safeNavigate(homeRoutes.question+`/${result.data?.qid}/${result.data?.slug}`);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setPostingQuestion(false);
        }
    }

    const generateTagHandler = async (
        data : GenerateTagPayload, 
    ) : Promise<TagPayload[]> =>{
        const newData:AskQuestionPayload  = {...data, tags: [], descriptionHTML:""};
        // validating input data
        const errors = askQuestionValidator(newData);

        if(Object.keys(errors).length !== 0){
            setErrors(errors);
            return [];
        }

        try{
            setGeneratingTags(true);
            const response = await generateTagService(data);
            const result = parseSuccessResponse<TagResponse>(response);
            // console.log(result.data?.tags);
            // console.log(response);
            setTags(result.data?.tags??[]);
            showToast.success(result.message);
            return result.data?.tags??[];
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setGeneratingTags(false);
        }
        return [];
    }

    const addTagHandler = (tagInput:string, tags: TagPayload[])=>{

        if(!tagInput || !(tagInput.trim())) return;

        if(tags.length == 10){
            showToast.error("Only 10 tags allowed");
            return;
        }

        const name = tagInput.trim().toLowerCase();

        if(tags.some((e)=>{ return e.name===name })){
            showToast.warning("Tag already added");
            return;
        }

        const newTag = {name: name, color: generateTagColor(tagInput)};
        setTags([...tags, newTag]);
    }

    const deleteTagHandler = (name:string)=>{
        setTags((tagState)=>{
            return tagState.filter((tag)=>tag.name!==name);
        });
    }

    return {
        askQuestionHandler,
        generateTagHandler,
        addTagHandler,
        deleteTagHandler,
    }
}