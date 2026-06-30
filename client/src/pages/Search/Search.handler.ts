import { useState } from "react";
import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service"
import { getPeopleSearchResultService, getQASearchResultService } from "../../services/search.service";
import { showToast } from "../../utils/toast.util";
import type { QuestionInterface } from "../../types/ApiResponse/question.type";
import type { UserInterface } from "../../types/ApiResponse/user.type";
import type { FetchPeopleResultsResponse, FetchQAResultsResponse } from "../../types/ApiResponse/search.type";

export const useSearchHandler = (
    setQuestions: React.Dispatch<React.SetStateAction<QuestionInterface[]>>,
    setPeople: React.Dispatch<React.SetStateAction<Partial<UserInterface>[]>>,
)=>{

    const [fetching, setFetching] = useState(false);

    const fetchQAResultsHandler = async (query:string)=>{
        try{
            setFetching(true);
            const response = await getQASearchResultService({query});
            const result = parseSuccessResponse<FetchQAResultsResponse>(response);
            // console.log(result);
            setQuestions(result.data?.results??[]);
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
        }finally{
            setFetching(false);
        }
    }
    const fetchPeopleResultsHandler = async (query:string)=>{
        try{
            setFetching(true);
            const response = await getPeopleSearchResultService({query});
            const result = parseSuccessResponse<FetchPeopleResultsResponse>(response);
            // console.log("people: ",result);
            setPeople(result.data?.results??[]);
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
        }finally{
            setFetching(false);
        }
    }
    return {
        fetching,
        fetchQAResultsHandler,
        fetchPeopleResultsHandler,
    }
}