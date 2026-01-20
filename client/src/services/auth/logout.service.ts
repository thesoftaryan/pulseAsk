import { logoutUserAPI } from "../../api/auth.api"
import { parseErrorResponse, parseSuccessResponse } from "../apiResponseParser.service";

export const logoutService = async ()=>{
    try{
        const response = await logoutUserAPI();
        return parseSuccessResponse(response);
    }catch(error){
        return parseErrorResponse(error);
    }
}