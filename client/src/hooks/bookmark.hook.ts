import { useState } from "react";
import { parseSuccessResponse, parseErrorResponse } from "../services/apiResponseParser.service";
import { isBookmarkedService, addBookmarkService, removeBookmarkService, fetchBookmarkedQuestionsService, fetchBookmarkedAnswersService } from "../services/bookmarks.service";
import type { AnswerInterface } from "../types/ApiResponse/answer.type";
import type { QuestionInterface } from "../types/ApiResponse/question.type";
import { showToast } from "../utils/toast.util";

export const useBookmark = ()=>{

    const [fetching, setFetching] = useState(false);

    const isBookmarked = async (data:any)=>{
        try{
            const response = await isBookmarkedService(data);
            const result = parseSuccessResponse<{bookmarked: boolean}>(response);
            return (result.data?.bookmarked??false);
        }catch(err){
            const error = parseErrorResponse(err);
            // showToast.error(error.message);
            console.error(error.message);
            return false;
        }
    }
    
    const toggleBookmark = async (data : any, bookmark : boolean)=>{
        
        try{
            if(bookmark){
                const response = await addBookmarkService(data);
                const result = parseSuccessResponse(response);
                showToast.success(result.message);
                return (true);
            }else{
                const response = await removeBookmarkService(data);
                const result = parseSuccessResponse(response);
                showToast.warning(result.message);
                return (false);
            }
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
            return !bookmark;
        }
    }

    const fetchBookmarked = async (type:string)=>{
        try{
            setFetching(true);
            if(type==="answer"){
                const response = await fetchBookmarkedAnswersService();
                const result = parseSuccessResponse<{answers:Partial<AnswerInterface>[]}>(response);
                return (result.data!.answers);
            }else{
                const response = await fetchBookmarkedQuestionsService();
                const result = parseSuccessResponse<{questions:QuestionInterface[]}>(response);
                return (result.data!.questions);
            }
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
            return [];
        }finally{
            setFetching(false);
        }
    }

    return {
        fetching,
        isBookmarked,
        toggleBookmark,
        fetchBookmarked,
    }
}