import { Answer } from "../models/Answer.model";
import { Question } from "../models/Question.model";
import { User } from "../models/User.model";


export const getQASearchResultService = async (query : string)=>{
    const questionResult = await Question.find(
        {
            $text:{
                $search : query,
            }
        },
        {
            score:{
                $meta: "textScore",
            }
        }
    ).sort({score:-1}).populate([
            {path: "author", select:"_id userName profile firstName lastName reputationScore college"},
            {path: "tags"},
            {
                path:"bestAnswer",
                populate: [
                    {path:"author", select:"_id userName profile firstName lastName reputationScore college"}
                ]
            }
    ]);
    const answerResult = await Answer.find(
       {
            $text:{
                $search : query,
            }
        },
        {
            qid: 1,
            score:{
                $meta: "textScore",
            }
        }
    ).sort({score:-1});
    // console.log("answers : ", answerResult, "\n\nquestions: ", questionResult);
    return questionResult;
}

export const getPeopleSearchResultService = async (query: string)=>{
    const user = await User.find(
    {
        $text: {
            $search: query
        }
    },
    {
        score: {
            $meta: "textScore"
        }
    }).sort({score: -1})
    .select("_id userName profile firstName lastName reputationScore college");
    return user;
}