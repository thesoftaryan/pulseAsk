import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service"
import { getPeopleSearchResultService, getQASearchResultService } from "../../services/search.service";
import { showToast } from "../../utils/toast.util";

export const useSearchHandler = (
    setQuestions: React.Dispatch<any>,
    setPeople: React.Dispatch<any>,
)=>{

    const fetchQAResultsHandler = async (query:string)=>{
        try{
            const response = await getQASearchResultService({query});
            const result = parseSuccessResponse<{results:any}>(response);
            // console.log(result);
            setQuestions(result.data?.results);
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
        }
    }
    const fetchPeopleResultsHandler = async (query:string)=>{
        try{
            const response = await getPeopleSearchResultService({query});
            const result = parseSuccessResponse<{results:any}>(response);
            // console.log("people: ",result);
            setPeople(result.data?.results);
        }catch(err){
            const error = parseErrorResponse(err);
            showToast.error(error.message);
        }
    }
    return {
        fetchQAResultsHandler,
        fetchPeopleResultsHandler,
    }
}