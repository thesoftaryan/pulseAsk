import type { AskQuestionPayload } from "../../../types/ApiRequest/question.type";


export const askQuestionValidator = (data : AskQuestionPayload)=>{
    const errors : Record<string, string> = {};

    let {title, description} = data;

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
    else if(description.length > 2000){
        errors.title = "Description can be of atmost 2000 characters";
    }

    return errors;
}