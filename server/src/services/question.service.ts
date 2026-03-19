import { Types } from "mongoose";
import { Question, QuestionInterface } from "../models/Question.model";
import { AskQuestionPayload } from "../types/question.type";
import { createTagService } from "./tag.service";




/**
 * @param data of type AskQuestionPayload
 * @returns question object of type QuestionInterface
 */
export const askQuestionService = async (data : AskQuestionPayload, uid: Types.ObjectId) : Promise<QuestionInterface>=>{
    const tags = await createTagService(data.tags);
    console.log("tags from create service: ",tags);
    const questionObj = {
        ...data,
        author: uid,
        askedAt: Date.now(),
        tags: tags,
    };
    const question = await Question.create(questionObj);

    await question.populate([
        {path: "tags"},
        {path: "author", select: "_id profile firstName lastName college reputationScore"},
    ]);

    return question;
}