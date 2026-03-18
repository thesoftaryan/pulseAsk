// import { useAppDispatch } from "../../../hooks/store.hook"
// import { uploadImageHandler } from "../../../components/common/TextEditor/ImageHandler/Image.handler";
import { parseErrorResponse, parseSuccessResponse } from "../../../services/apiResponseParser.service";
import { askQuestionService } from "../../../services/question/askQuestion.service";
import { generateTagService } from "../../../services/question/generateTag.service";
import type { AskQuestionPayload } from "../../../types/ApiRequest/question.type";
import type { GenerateTagPayload, TagPayload } from "../../../types/ApiRequest/tag.type";
import type { TagResponseData } from "../../../types/ApiResponse/index.type";
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

    const askQuestionHandler = async (data : AskQuestionPayload)=>{
        const errors = askQuestionValidator(data);

        if(Object.keys(errors).length !== 0){
            setErrors(errors);
            return;
        }

        
        try{
            setPostingQuestion(true);
            if(!data.tags || data.tags.length===0){
                await generateTagHandler({title: data.title??"", description: data.description??""});
            }
            const response = await askQuestionService(data);
            const result = parseSuccessResponse(response);
            showToast.success(result.message);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setPostingQuestion(false);
        }
    }

    const generateTagHandler = async (
        data : GenerateTagPayload, 
    )=>{
        const newData:AskQuestionPayload  = {...data, tags: [], descriptionHTML:""};
        // validating input data
        const errors = askQuestionValidator(newData);

        if(Object.keys(errors).length !== 0){
            setErrors(errors);
            return;
        }

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