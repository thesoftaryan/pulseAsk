import { Types } from "mongoose";
import { Answer, AnswerInterface } from "../models/Answer.model";
import { FetchAnswersPayload, PostAnswerPayload } from "../types/answer.type";


/**
 * @param data of type PostAnswerPayload
 * @returns answer object of type AnswerInterface
 */
export const postAnswerService = async (author:Types.ObjectId, data : PostAnswerPayload)=>{
    const answerObj = {
        ...data,
        author,
        askedAt: Date.now(),
    };
    await Answer.create(answerObj);
}

/**
 * @param data of type FetchAnswersPayload
 * @returns array of answer objects for that particular question.
 */
export const fetchAnswersService = async (data : FetchAnswersPayload)=>{
    const answers = await Answer.find({qid: data.qid}).populate([
        {path: "author", select:"_id firstName lastName profile college"}
    ]);
    return answers;
}