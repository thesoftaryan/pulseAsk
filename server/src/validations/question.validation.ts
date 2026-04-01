import mongoose from "mongoose";
import { AskQuestionPayload, FetchQuestionPayload } from "../types/question.type";


export const validateAskQuestion = (body : AskQuestionPayload)=>{
    const errors : Record<string, string> = {};



    let {title, description, descriptionHTML} = body;

    if(title) title  = title.trim();
    if(description) description = description.trim();
    
    if(!title || title.length < 5){
        errors.title = "Title is required to be of atleast 5 characters";
    }
    else if(title.length > 100){
        errors.title = "Title can be of atmost 100 characters";
    }
    else if(!description || description.length < 10){
        errors.description = "Description is required to be of atleast 10 characters";
    }
    else if(description.length > 5000){
        errors.title = "Description can be of atmost 5000 characters";
    }
    else if(!descriptionHTML){
        errors.description = "descriptionHTML is required";
    }

    return errors;
}

export const validateFetchQuestion = (body: FetchQuestionPayload)=>{
    const errors : Record<string, string> = {};



    const{qid} = body;
    if(!qid){
        errors.qid = "qid is required to fetch question";
    }
    return errors;
}