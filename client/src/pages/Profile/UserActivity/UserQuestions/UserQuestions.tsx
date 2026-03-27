// import { Question } from "../../../../components/common/Question/Question";
import { Question } from "../../../../components/common/Question/Question";
import { useSafeNavigate } from "../../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../../routes/routesConstants";
import type { QuestionInterface } from "../../../../types/ApiResponse/question.type";
import UserQuestionsStyle from "./UserQuestions.module.css";


interface UserQUestionsProps{
    questions: QuestionInterface[],
}

export const UserQuestions:React.FC<UserQUestionsProps> = ({questions})=>{
    const {safeNavigate} = useSafeNavigate();
    return (
        <div className={UserQuestionsStyle["container"]}>
            <div className={UserQuestionsStyle["questions"]}>
                {/* <Question question={}/> */}
                {
                    questions.map((question)=>{
                        return <Question key={question._id} question={question} onClick={()=>{safeNavigate(homeRoutes.question+`/${question._id}/${question.slug}`)}}/>
                    })
                }
            </div>
        </div>
    );
}