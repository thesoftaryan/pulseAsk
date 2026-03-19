import { Types } from "mongoose";
import { Question, QuestionInterface } from "../models/Question.model";
import { AskQuestionPayload } from "../types/question.type";
import { createTagService } from "./tag.service";
import { slugifyText } from "../utils/general.util";




/**
 * @param data of type AskQuestionPayload
 * @returns question object of type QuestionInterface
 */
export const askQuestionService = async (data : AskQuestionPayload, uid: Types.ObjectId) : Promise<QuestionInterface>=>{
    const tags = await createTagService(data.tags);
    // console.log("tags from create service: ",tags);
    const questionObj = {
        ...data,
        slug: slugifyText(data.title),
        author: uid,
        askedAt: Date.now(),
        tags: tags,
    };
    const question = await Question.create(questionObj);

    return question;
}