import { GenerateTagPayload } from "../types/tag.type";

export const validateGenerateTag = (body : GenerateTagPayload)=>{
    const errors : Record<string, string> = {};

    if(!body || typeof body !=="object"){
        errors.body = "Request body is required";
        return errors;
    }

    let {title, description} = body;

    if(title) title  = title.trim();
    if(description) description = description.trim();
    
    if(!title || title.length < 5){
        errors.title = "Title is required to be of atleast 5 characters";
    }
    if(!description || description.length < 10){
        errors.description = "Description is required to be of atleast 10 characters";
    }

    return errors;
}