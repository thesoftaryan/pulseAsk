import { useState } from "react";
import UserActivityStyle from "./UserActivity.module.css";
import { UserQuestions } from "./UserQuestions/UserQuestions";

export type TabsType = "answers"|"questions"|"about";

export const UserActivity = ()=>{

    const tabs = [
        { label: "Answers", value: "answers" },
        { label: "Questions", value: "questions" },
        { label: "About", value: "about" },
    ];
    const [activeTab, setActiveTab] = useState<TabsType>("questions");

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
                {activeTab=="answers" && UserQuestions("answers")}
                {activeTab=="questions" && UserQuestions("questions")}
                {activeTab=="about" && "This is about me, hello there, what do you want to know about me, just drop me a message using the chat functionality."}
            </div>
        </div>
    );
}