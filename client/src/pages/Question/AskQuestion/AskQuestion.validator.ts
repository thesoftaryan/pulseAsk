import type { QuestionInterface } from "../../../types/ApiResponse/question.type";


export const askQuestionValidator = (data : Partial<QuestionInterface>)=>{
    const errors : Record<string, string> = {};

    let {title, description} = data;

    if(title) title  = title.trim();
    if(description) description = description.trim();
    
    if(!title || title.length < 5){
        errors.title = "Title is required to be of atleast 5 characters";
        return errors;
    }
    if(!description || description.length < 10){
        errors.description = "Description is required to be of atleast 10 characters";
        return errors;
    }

    return errors;
}