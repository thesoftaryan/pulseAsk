import { Answer } from "../../components/common/Answer/Answer";
import { Question } from "../../components/common/Question/Question";
import { TagChip } from "../../components/common/TagChip/TagChip";
import { FilterBar } from "../../components/layout/FilterBar/FilterBar";
import type { AnswerInterface } from "../../types/ApiResponse/answer.type";
import TagStyle from "./Tag.module.css";

import LoadMoreIcon from "../../assets/icons/general/load_more.svg?react";
import Button from "../../components/common/Button/Button";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTagHandler } from "./Tag.handler";


export const Tag = ()=>{
    const params = useParams();
    const slug = params.tagSlug;

    const [questions, setQuestions] = useState<any>();

    const {fetchQuestions} = useTagHandler(
        setQuestions,
    );

    const answerObj : Partial<AnswerInterface> = {
        author : {_id: "2", email: "thesoftaryan@gmail.com", firstName:"Aryan", lastName:"Maurya"},
        content : "Steps important for CPR: First of all make the person lie on his back and then you can do one thing and that is you have to search on youtube and then see there the actual steps, it is better to see than read.",
    }
    return (
        <div className={TagStyle["container"]}>
            <div className={TagStyle["tag-section"]}>
                <TagChip slug="heart-attack" color="green" text="Heart Attack" isLarge={true} level1={true}/>
                <div className={TagStyle["question-count"]}>
                    7,023 Questions
                </div>
            </div>
            <div className={TagStyle["filters-main-section"]}>
                <div className={TagStyle["filters-section"]}>
                    <FilterBar/>
                </div>
                <div className={TagStyle["main-content"]}>
                    {/* <Question id="" title="How to do CPR correctly, Urgent help needed!" author={{_id: "1", email: "", firstName:"", lastName:""}}/>
                    <Question best_answer={<Answer level1Comments={true} author={answerObj.author!} content={answerObj.content!}/>} id="" title="How to do CPR correctly, Urgent help needed!" author={{_id: "1", email: "", firstName:"", lastName:""}}/> */}
                    
                    <div className={TagStyle["load-more-button"]}>
                        <Button text="Load More" isSmall={true} level1={true} Icon={LoadMoreIcon}/>
                    </div>
                </div>
            </div>
        </div>
    );
}