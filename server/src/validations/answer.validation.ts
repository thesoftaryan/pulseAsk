import { FetchAnswersPayload, PostAnswerPayload } from "../types/answer.type";

export const validatePostAnswer = (body : PostAnswerPayload)=>{
    const errors:Record<string, string> = {};
    if(!body || typeof(body)!=="object"){
        errors.body = "Request body is required";
        return errors;
    }

    const {qid, content, contentHTML} = body;

    if(!qid){
        errors.qid="question id is required";
    }else if(!content || content.length<10){
        errors.content = "answer is required to be of atleast 10 characters";
    }else if(!contentHTML || contentHTML.length<10){
        errors.contentHTML = "answer is required to be of atleast 10 characters";
    }
    return errors;
}

export const validateFetchAnswers = (body : FetchAnswersPayload)=>{
    const errors:Record<string, string> = {};
    if(!body || typeof(body)!=="object"){
        errors.body = "Request body is required";
        return errors;
    }

    const {qid} = body;

    if(!qid){
        errors.qid="question id is required";
    }
    return errors;
}