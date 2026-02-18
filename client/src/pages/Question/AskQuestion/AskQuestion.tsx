import AskQuestionStyle from "./AskQuestion.module.css";

// Icons
import QuestionIcon from "../../../assets/icons/general/question.svg?react";
import AiIcon from "../../../assets/icons/general/ai.svg?react";
import { Icon } from "../../../components/common/Icon/Icon";

import Button from "../../../components/common/Button/Button";
import type { AnswerInterface } from "../../../types/answer.types";

import { useState } from "react";

import TextEditor from "../../../components/common/TextEditor/TextEditor";
import type { JSONContent } from "@tiptap/react";
import InputField from "../../../components/common/InputField/InputField";





export const AskQuestion = ()=>{
        const answerObj : AnswerInterface = {
            author : {uid: "2", email: "thesoftaryan@gmail.com", first_name:"Aryan", last_name:"Maurya"},
            content : "Steps important for CPR: First of all make the person lie on his back and then you can do one thing and that is you have to search on youtube and then see there the actual steps, it is better to see than read.",
        }
        const [answerContent, setAnswerContent] = useState<JSONContent | null>(null);

    return (
        <div className={AskQuestionStyle["container"]}>
            <div className={AskQuestionStyle["main-content"]}>
                    <div className={AskQuestionStyle["page-title-container"]}>
                        <QuestionIcon className={AskQuestionStyle["question-icon"]}/>
                        <div className={AskQuestionStyle["page-title"]}>Ask a question</div>
                    </div>
                    <div className="question-title-container">
                        <div className="title-text"></div>
                        <InputField placeholder="Enter question title"/>
                    </div>
                    <div className={AskQuestionStyle["description-container"]}>
                        {/* <textarea className={AskQuestionStyle["submit-answer-textarea"]}/> */}
                        <TextEditor onChange={setAnswerContent} placeholder="Enter your Answer here!!"/>
                    </div>
                    <div className="question-tags-container">

                    </div>
                    <Button text="Post Answer" onClick={()=>{console.log(answerContent)}}/>
            </div>
        </div>
    );
};