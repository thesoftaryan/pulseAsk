import { getHomeMessageAPI } from "../../api/home.api";
import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service";


export const useHomeHandler = ()=>{

    const homeHandler = async ( setBackendMessage : React.Dispatch<React.SetStateAction<string>>)=>{
        try{
            // console.log("calling api");
            const response = await getHomeMessageAPI();
            console.log(response);
            const parsed = parseSuccessResponse(response);
            setBackendMessage(parsed.message);
        }catch(error){
            const parsed = parseErrorResponse(error);
            setBackendMessage(parsed.message);
        }
    }

    return {
        homeHandler,
    };
}