import { fetchAnswersAPI } from "../../api/answer.api";
import type { FetchAnswersPayload } from "../../types/ApiRequest/answer.type";


export const fetchAnswersService = (data:FetchAnswersPayload)=>{
    return fetchAnswersAPI(data);
}