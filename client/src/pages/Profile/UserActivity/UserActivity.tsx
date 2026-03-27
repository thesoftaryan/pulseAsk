import { useState } from "react";
import UserActivityStyle from "./UserActivity.module.css";
import { UserQuestions } from "./UserQuestions/UserQuestions";
import { UserAnswers } from "./UserAnswers/UserAnswers";
import { AboutUser } from "./AboutUser/AboutUser";
import type { UserInterface } from "../../../types/ApiResponse/user.type";
import type { QuestionInterface } from "../../../types/ApiResponse/question.type";
import type { AnswerInterface } from "../../../types/ApiResponse/answer.type";


interface UserActivityProps{
    user: Partial<UserInterface>,
    questions: QuestionInterface[],
    answers: AnswerInterface[],
}

export type TabsType = "answers"|"questions"|"about";

export const UserActivity:React.FC<UserActivityProps> = ({user, questions, answers})=>{

    const tabs = [
        { label: "Answers", value: "answers" },
        { label: "Questions", value: "questions" },
        { label: "About", value: "about" },
    ];
    const [activeTab, setActiveTab] = useState<TabsType>("about");

    return (
        <div className={UserActivityStyle["container"]}>
            <div className={UserActivityStyle["tab-bar"]}>
                <div className={UserActivityStyle["tab-bar-background"]}>
                    <div className={UserActivityStyle["tabs"]}>
                        {
                            tabs.map((tab)=>{
                                return <div 
                                key={tab.value}
                                onClick={()=>{setActiveTab(tab.value as TabsType)}}
                                className={`${UserActivityStyle["tab"]} ${activeTab==tab.value? UserActivityStyle["active-tab"]:""}`}
                                >
                                    {tab.label}
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
            <div className={UserActivityStyle["tab-content"]}>
                {activeTab=="answers" && <UserAnswers answers={answers}/>}
                {activeTab=="questions" && <UserQuestions questions={questions}/>}
                {activeTab=="about" && <AboutUser user={user}/>}
            </div>
        </div>
    );
}