import mongoose, { Types } from "mongoose";
import { Question, QuestionInterface } from "../models/Question.model";
import { AskQuestionPayload, FetchQuestionPayload } from "../types/question.type";
import { createTagService, generateTagService } from "./tag.service";
import { slugifyText } from "../utils/general.util";
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes.constants";
import { User } from "../models/User.model";
import { reputationPolicy } from "../constants/reputation.constants";
import { updateUserStatsService } from "./profile.service";




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

    const tags = await createTagService(data.tags, true);
    // console.log("tags from create service: ",tags);
    const questionObj = {
        ...data,
        slug: titleSlug,
        author: uid,
        askedAt: Date.now(),
        tags: tags,
    };
    const question = await Question.create(questionObj);


    await updateUserStatsService(uid, {
        reputationChange: reputationPolicy.questionAsked,
        questionsAskedChange: 1,
    });

    // await User.updateOne({_id: uid}, 
    //     {
    //         $inc: {
    //             reputationScore: reputationPolicy.questionAsked,
    //             questionsAsked: 1,
    //         }
    //     }
    // );

    return question;
}

/**
 * @param qid Id of the question to fetch
 * @returns question object of type FetchQuestionReponse
 */
export const fetchQuestionService = async (data : FetchQuestionPayload) =>{
    if(!mongoose.Types.ObjectId.isValid(data.qid)){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "Question not found",
        );
    }
    
    const question = await Question.findById(data.qid);
    if(!question){
        throw new ApiError(
            STATUS.CLIENT_ERROR.NOT_FOUND,
            "Question not found",
        );
    }

    await question.populate([
        {path:"tags"},
        {path:"author", select:"_id userName firstName lastName profile reputationScore"},
        {path:"bestAnswer"},
    ]);

    return question;
}

/**
 * @param qid Id of the question to fetch
 * @returns question object of type FetchQuestionReponse
 */
export const fetchQuestionsService = async () : Promise<QuestionInterface[]> =>{
    
    const questions = await Question.find().populate([
        {path:"tags"},
        {path:"author", select:"_id userName firstName lastName profile reputationScore"},
        {
            path:"bestAnswer",
            populate: {
                path: "author",
                select: "_id userName firstName lastName profile college"
            }
        },
    ]); 

    return questions;
}

