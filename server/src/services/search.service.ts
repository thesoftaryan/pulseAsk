import { Answer } from "../models/Answer.model";
import { Question } from "../models/Question.model";
import { User } from "../models/User.model";
import { SearchPayload } from "../types/search.type";


export const getQASearchResultService = async (payload : SearchPayload)=>{
    const {query} = payload;
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
    )
    .limit(50)
    .sort({
        score: {
            $meta: "textScore"
        }
    })
    .populate([
            {path: "author", select:"_id userName profile firstName lastName reputationScore college"},
            {path: "tags"},
            {
                path:"bestAnswer",
                populate: [
                    {path:"author", select:"_id userName profile firstName lastName reputationScore college"}
                ]
            }
    ]);

    const existingQuestionIds = new Set(
        questionResult.map((question) => question._id.toString())
    );

    let answerResult = await Answer.find(
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
    )
    .limit(50)
    .sort({
        score: {
            $meta: "textScore"
        }
    });
    answerResult = answerResult.filter(
        (answer) => !existingQuestionIds.has(answer.qid.toString())
    );
    const remainingQuestionIds = [
        ...new Set(
            answerResult.map((answer) => answer.qid.toString())
        )
    ];

    const answerQuestions = await Question.find({
        _id: {
            $in: remainingQuestionIds
        }
    })
    .populate([
        {path: "author", select:"_id userName profile firstName lastName reputationScore college"},
        {path: "tags"},
        {
            path:"bestAnswer",
            populate: [
                {path:"author", select:"_id userName profile firstName lastName reputationScore college"}
            ]
        }
    ]);
    return [
        ...questionResult,
        ...answerQuestions
    ];
}

export const getPeopleSearchResultService = async (payload : SearchPayload)=>{
    const {query} = payload;
    const users = await User.find(
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
    return users;
}