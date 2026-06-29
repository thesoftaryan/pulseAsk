import { useState } from "react";
import { getHomeMessageAPI } from "../../api/home.api";
import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service";
import { fetchQuestionsService } from "../../services/question/fetchQuestion.service";
import type { QuestionInterface } from "../../types/ApiResponse/question.type";
import { showToast } from "../../utils/toast.util";


export const useHomeHandler = ()=>{

    const [fetching, setFetching] = useState(false);

    const homeHandler = async ( setBackendMessage : React.Dispatch<React.SetStateAction<string>>)=>{
        try{
            // console.log("calling api");
            const response = await getHomeMessageAPI();
            // console.log(response);
            const parsed = parseSuccessResponse(response);
            setBackendMessage(parsed.message);
        }catch(error){
            const parsed = parseErrorResponse(error);
            setBackendMessage(parsed.message);
        }
    }

    const fetchQuestionsHandler = async (
        setQuestions: React.Dispatch<React.SetStateAction<QuestionInterface[]>>
    ) => {
        try{
            setFetching(true);
            // console.log("calling api");
            const response = await fetchQuestionsService();
            const result = parseSuccessResponse<QuestionInterface[]>(response);
            let questions = result.data!;
            questions.sort((a,b)=>{
                return new Date(b.askedAt).getTime() - new Date(a.askedAt).getTime();
            });
            setQuestions(questions);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setFetching(false);
        }
    }

    return {
        fetching,
        homeHandler,
        fetchQuestionsHandler,
    };
}