// import { Answer } from "../../components/common/Answer/Answer";
import { Question } from "../../components/common/Question/Question";
import { TagChip } from "../../components/common/TagChip/TagChip";
import { FilterBar } from "../../components/layout/FilterBar/FilterBar";
// import type { AnswerInterface } from "../../types/ApiResponse/answer.type";
import TagStyle from "./Tag.module.css";

import LoadMoreIcon from "../../assets/icons/general/load_more.svg?react";
import Button from "../../components/common/Button/Button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTagHandler } from "./Tag.handler";
import type { TagInterface } from "../../types/ApiResponse/tag.type";
import type { QuestionInterface } from "../../types/ApiResponse/question.type";


export const Tag = ()=>{
    const params = useParams();
    const slug = params.tagSlug;

    const [tag, setTag] = useState<TagInterface>();
    const [questions, setQuestions] = useState<QuestionInterface[]>([]);

    const {initPage} = useTagHandler(
        setQuestions,
        setTag,
    );
    useEffect(()=>{
        if(slug){
            // console.log("slug: ", slug)
            initPage(slug);
        }
    }, [slug]);

    return (
        <div className={TagStyle["container"]}>
            <div className={TagStyle["tag-section"]}>
                <TagChip slug={tag?.slug} color={tag?.color??""} text={tag?.name??""} isLarge={true} level1={true}/>
                <div className={TagStyle["question-count"]}>
                    {tag?.usageCount} Questions
                </div>
            </div>
            <div className={TagStyle["filters-main-section"]}>
                <div className={TagStyle["filters-section"]}>
                    <FilterBar/>
                </div>
                <div className={TagStyle["main-content"]}>
                    {/* <Question id="" title="How to do CPR correctly, Urgent help needed!" author={{_id: "1", email: "", firstName:"", lastName:""}}/>
                    <Question best_answer={<Answer level1Comments={true} author={answerObj.author!} content={answerObj.content!}/>} id="" title="How to do CPR correctly, Urgent help needed!" author={{_id: "1", email: "", firstName:"", lastName:""}}/> */}
                    {
                        questions && 
                        questions.map((question)=>{
                            return <Question key={question._id} question={question} level1Comments={true}/>;
                        })
                    }
                    <div className={TagStyle["load-more-button"]}>
                        <Button text="Load More" isSmall={true} level1={true} Icon={LoadMoreIcon}/>
                    </div>
                </div>
            </div>
        </div>
    );
}