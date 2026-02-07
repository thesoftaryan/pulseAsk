import { Answer } from "../../components/common/Answer/Answer";
import { Question } from "../../components/common/Question/Question";
import { FilterBar } from "../../components/layout/FilterBar/FilterBar";
import type { AnswerInterface } from "../../types/answer.types";
import TagStyle from "./Tag.module.css";


export const Tag = ()=>{
    const answerObj : AnswerInterface = {
        author : {uid: "2", email: "thesoftaryan@gmail.com", first_name:"Aryan", last_name:"Maurya"},
        content : "Steps important for CPR: First of all make the person lie on his back and then you can do one thing and that is you have to search on youtube and then see there the actual steps, it is better to see than read.",
    }
    return (
        <div className={TagStyle["container"]}>
            <div className={TagStyle["tag-section"]}></div>
            <div className={TagStyle["filters-section"]}>
                <FilterBar/>
            </div>
            <div className={TagStyle["main-content"]}>
                <Question id="" title="How to do CPR correctly, Urgent help needed!" author={{uid: "1", email: "", first_name:"", last_name:""}}/>
                <Question best_answer={<Answer author={answerObj.author} content={answerObj.content}/>} id="" title="How to do CPR correctly, Urgent help needed!" author={{uid: "1", email: "", first_name:"", last_name:""}}/>

            </div>
        </div>
    );
}