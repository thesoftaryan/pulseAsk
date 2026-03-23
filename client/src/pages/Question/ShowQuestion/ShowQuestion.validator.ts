import type { PostAnswerPayload } from "../../../types/ApiRequest/answer.type";


export const postAnswerValidator = (data : PostAnswerPayload)=>{
    const errors : Record<string, string> = {};

    const {qid, content, contentHTML} = data;
    if(!qid){
        errors.qid="question id is required";
    }else if(!content || content.length<10){
        errors.content = "answer is required to be of atleast 10 characters";
    }else if(!contentHTML || contentHTML.length<10){
        errors.contentHTML = "answer is required to be of atleast 10 characters";
    }
    return errors;
}