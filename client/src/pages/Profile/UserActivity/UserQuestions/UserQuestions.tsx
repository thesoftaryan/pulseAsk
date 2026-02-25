import { Question } from "../../../../components/common/Question/Question";
import UserQuestionsStyle from "./UserQuestions.module.css";


export const UserQuestions = ()=>{
    return (
        <div className={UserQuestionsStyle["container"]}>
            <div className={UserQuestionsStyle["questions"]}>
                <Question title={`Something which is really interesting for tab : 1`}/>
                <Question title={`Something which is really interesting for tab : 1`}/>
                <Question title={`Something which is really interesting for tab : 1`}/>
                <Question title={`Something which is really interesting for tab : 1`}/>
                <Question title={`Something which is really interesting for tab : 1`}/>
                <Question title={`Something which is really interesting for tab : 2`}/>
            </div>
        </div>
    );
}