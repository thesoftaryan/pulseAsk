import { GenerateTagPayload, TagPayload } from "../types/tag.type";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes";
import { generateTagColor } from "../utils/tag.util";
import { Tag } from "../models/Tag.model";
import { Types } from "mongoose";
import { slugifyText } from "../utils/general.util";
import { GenerateTagResponse } from "../types/response/tag.type";


const generator = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = generator.getGenerativeModel({
    model: "gemini-2.5-flash",
});

/**
 * @param data of type GenerateTagPayload 
 * @returns Generated list of tags
*/
export const generateTagService = async (data : GenerateTagPayload)=>{
    const {title, description} = data;

    const prompt = `
        You are an excellent tag extractor for a medical Q&A platform.
        Make sure you are extremely careful because it is a medical
        platform.

        Extract at most 7 relevant tags from the given question.
        Make sure that the tags are highly relevant, also there is
        no constraints for generating exactly 7 tags, you just need
        to generate at most 7 tags in the worst case if all of the
        tags are independent of each other.
    
        (Important) Return ONLY a string array of lowercase tags, you
        need not to output any extra character, just an array of 
        strings denoting tags.
        e.g. ["tag1", "tag2", ...]

        Maximum 7 tags. You can generate lesser than this count as well
        if there are lesser amount of important tags, don't give
        garbage tags.
    
        Here is the content of the question from which you have to
        extract the tags:
        title: ${title}
        description: ${description}
    
    `;

    
    const tagsResponse : GenerateTagResponse[] = [];
    try{
        const result = await model.generateContent(prompt);
        const text = result.response.text(); 
        let tags : string[]=JSON.parse(text);
        
        
        tags.map((tagName)=>{
            const tag : GenerateTagResponse = {
                name: tagName,
                color: generateTagColor(tagName),
            };
            tagsResponse.push(tag);
        });
    }catch(error){
        throw new ApiError(
            STATUS.SERVER_ERROR.BAD_GATEWAY,
            "Tag generation failed, please try later.",
        )
    }
    
    return tagsResponse;
}

export const createTagService = async (data : TagPayload[])=>{
    const response:Types.ObjectId[] = [];
    
    for(const tagData of data){
        const tagObject = {
            slug: slugifyText(tagData.name),
            name: tagData.name,
            color: generateTagColor(tagData.name),
        }
        // console.log("tagObject: ",tagObject);
        let tag = await Tag.findOne({slug: tagObject.slug});
        if(!tag){
            tag = await Tag.create(tagObject);
        }
        // console.log("tag: ", tag);
        response.push(tag._id);
    }

    // console.log("responseObj: ", response);
    return response;
}