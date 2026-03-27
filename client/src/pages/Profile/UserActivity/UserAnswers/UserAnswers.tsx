import { UserAnswerTile } from "./UserAnswerTile/UserAnswerTile";
import type { AnswerInterface } from "../../../../types/ApiResponse/answer.type";
import UserAnswerStyle from "./UserAnswers.module.css";


interface UserAnswersProps{
    answers: AnswerInterface[],
}

export const UserAnswers:React.FC<UserAnswersProps> = ({answers})=>{
    console.log(answers);
    return (
        <div className={UserAnswerStyle["container"]}>
            <div className={UserAnswerStyle["answers"]}>
                {
                    answers.map((answer)=>{
                        return <UserAnswerTile key={answer._id} answer={answer} level1={true}/>;
                    })
                }
            </div>
        </div>
    );
}