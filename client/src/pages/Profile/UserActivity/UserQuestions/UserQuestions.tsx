// import { Question } from "../../../../components/common/Question/Question";
import UserQuestionsStyle from "./UserQuestions.module.css";


export const UserQuestions = ()=>{
    return (
        <div className={UserQuestionsStyle["container"]}>
            <div className={UserQuestionsStyle["questions"]}>
                {/* <Question question={}/> */}
                User asked questions
            </div>
        </div>
    );
}