import { Question } from "../../../../components/common/Question/Question";
import type { TabsType } from "../UserActivity";
import UserQuestionsStyle from "./UserQuestions.module.css";

export const UserQuestions = (tab : TabsType)=>{
    return (
        <div className="container" style={{display:"flex"}}>
            <Question title={`Something which is really interesting for tab : ${tab}`}/>
            <Question title={`Something which is really interesting for tab : ${tab}`}/>
        </div>
    );
}