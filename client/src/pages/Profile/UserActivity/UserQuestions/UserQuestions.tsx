// import { Question } from "../../../../components/common/Question/Question";
import { Question } from "../../../../components/common/Question/Question";
import type { QuestionInterface } from "../../../../types/ApiResponse/question.type";
import UserQuestionsStyle from "./UserQuestions.module.css";


interface UserQUestionsProps{
    questions: QuestionInterface[],
}

export const UserQuestions:React.FC<UserQUestionsProps> = ({questions})=>{
    return (
        <div className={UserQuestionsStyle["container"]}>
            <div className={UserQuestionsStyle["questions"]}>
                {
                    questions.length===0 && <p className={UserQuestionsStyle["label"]}> No Question posted by this user</p>
                }
                {
                    questions.map((question)=>{
                        return <Question key={question._id} question={question}/>
                    })
                }
            </div>
        </div>
    );
}