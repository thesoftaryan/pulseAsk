import { UserAnswerTile } from "./UserAnswerTile/UserAnswerTile";
import type { AnswerInterface } from "../../../../types/answer.types";
import UserAnswerStyle from "./UserAnswers.module.css";

export const UserAnswers = ()=>{
        const answerObj : AnswerInterface = {
            author : {uid: "2", email: "thesoftaryan@gmail.com", firstName:"Aryan", lastName:"Maurya"},
            content : "Steps important for CPR: First of all make the person lie on his back and then you can do one thing and that is you have to search on youtube and then see there the actual steps, it is better to see than read.",
        }
    return (
        <div className={UserAnswerStyle["container"]}>
            <div className={UserAnswerStyle["answers"]}>
                <UserAnswerTile level1={true} author={answerObj.author} content={answerObj.content}/>
                <UserAnswerTile level1={true} author={answerObj.author} content={answerObj.content}/>
                <UserAnswerTile level1={true} author={answerObj.author} content={answerObj.content}/>
                <UserAnswerTile level1={true} author={answerObj.author} content={answerObj.content}/>
                <UserAnswerTile level1={true} author={answerObj.author} content={answerObj.content}/>
            </div>
        </div>
    );
}