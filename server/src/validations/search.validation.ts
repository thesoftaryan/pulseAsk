import { Types } from "mongoose";
import { SearchPayload } from "../types/search.type";

export const validateSearch = (body : SearchPayload)=>{
    const errors:Record<string, string> = {};


    const {query} = body;

    if(!query){
        errors.query="query is required";
    }
    return errors;
}