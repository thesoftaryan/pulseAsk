import { Types } from "mongoose";
import { Question, QuestionInterface } from "../models/Question.model";
import { AskQuestionPayload } from "../types/question.type";
import { createTagService, generateTagService } from "./tag.service";
import { slugifyText } from "../utils/general.util";
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes";




/**
 * @param data of type AskQuestionPayload
 * @returns question object of type QuestionInterface
 */
export const askQuestionService = async (data : AskQuestionPayload, uid: Types.ObjectId) : Promise<QuestionInterface>=>{
    const titleSlug = slugifyText(data.title);
    const duplicate = await Question.findOne({slug: titleSlug});

    if(duplicate){
        throw new ApiError(
            STATUS.CLIENT_ERROR.CONFLICT,
            "A Question with exact title exists, be more specific",
            {
                "duplicate": duplicate._id.toString(),
            }
        );
    }

    if(!data.tags || data.tags.length == 0){
        data.tags = await generateTagService({
            title: data.title,
            description: data.description,
        });
    }

    const tags = await createTagService(data.tags);
    // console.log("tags from create service: ",tags);
    const questionObj = {
        ...data,
        slug: titleSlug,
        author: uid,
        askedAt: Date.now(),
        tags: tags,
    };
    const question = await Question.create(questionObj);

    return question;
}