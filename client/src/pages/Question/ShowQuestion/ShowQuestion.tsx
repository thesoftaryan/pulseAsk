import ShowQuestionStyle from "./ShowQuestion.module.css";

// Icons
import QuestionIcon from "../../../assets/icons/general/question.svg?react";
import UpvoteIcon from "../../../assets/icons/general/upvote.svg?react";
import DownvoteIcon from "../../../assets/icons/general/downvote.svg?react";
import BookmarkIcon from "../../../assets/icons/general/bookmark.svg?react";
import ReportIcon from "../../../assets/icons/general/report.svg?react";
import ReputationIcon from "../../../assets/icons/general/reputation.svg?react";

import { Icon } from "../../../components/common/Icon/Icon";

import {Image} from "../../../components/common/Image/Image";
import { UserProfile } from "../../../components/common/UserProfile/UserProfile";
import Button from "../../../components/common/Button/Button";
import { FilterBar } from "../../../components/layout/FilterBar/FilterBar";
import { Answer } from "../../../components/common/Answer/Answer";
import type { AnswerInterface } from "../../../types/answer.types";
import { QuestionTags } from "./QuestionTags/QuestionTags";


export const ShowQuestion = ()=>{
        const answerObj : AnswerInterface = {
            author : {uid: "2", email: "thesoftaryan@gmail.com", first_name:"Aryan", last_name:"Maurya"},
            content : "Steps important for CPR: First of all make the person lie on his back and then you can do one thing and that is you have to search on youtube and then see there the actual steps, it is better to see than read.",
        }
    return (
        <div className={ShowQuestionStyle["container"]}>
            <div className={ShowQuestionStyle["main-content"]}>
                    <div className={ShowQuestionStyle["show-question-container"]}>
                        <div className={ShowQuestionStyle["question-title"]}>
                            <QuestionIcon className={ShowQuestionStyle["question-icon"]}/>
                            <div className={ShowQuestionStyle["title-text"]}>How to do CPR correctly, Urgent help needed!</div>
                            <div className={ShowQuestionStyle["actions-container"]}>
                                <Icon IconData={BookmarkIcon} />
                                <Icon IconData={ReportIcon}/>
                            </div>
                        </div>
                        <div className={ShowQuestionStyle["question-content"]}>
                            3 types of Notification : <br/>
                            1. If the user gets his answer for a question he asked <br/>
                            2. when someone sends him money <br/>
                            3. when someone sends him a message <br/>
                            When a user clicks on the view now, it will be redirected to the required location
                            Now, to do the CPR correctly, see the below image that I have attached for your reference<br/>
                            <Image path="https://plus.unsplash.com/premium_photo-1682001641334-aba3a6584a31?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
                        </div>
                        <div className={ShowQuestionStyle["question-meta"]}>
                            <div className={ShowQuestionStyle["left"]}>
                                <div className={ShowQuestionStyle["question-time"]}>Asked <span className={ShowQuestionStyle["time-val"]}>24h ago</span></div>
                                <Icon active={true} IconData={UpvoteIcon} text="Upvote"/>
                                <Icon IconData={DownvoteIcon}/>
                            </div>
                            <div className={ShowQuestionStyle["right"]}>
                                <div className={ShowQuestionStyle["profile"]}>
                                    <UserProfile/>
                                </div>
                                <div className={ShowQuestionStyle["user-data"]}>
                                    <div className={ShowQuestionStyle["user-name"]}>
                                        Aryan Maurya
                                    </div>
                                    <div className={ShowQuestionStyle["user-reputation"]}>
                                        <ReputationIcon className={ShowQuestionStyle["reputation-icon"]}/>
                                        <div className={ShowQuestionStyle["reputation-count"]}>
                                            2.6K
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={ShowQuestionStyle["submit-answer-container"]}>
                        {/* <textarea className={ShowQuestionStyle["submit-answer-textarea"]}/> */}
                        <Button text="Post Answer"/>
                    </div>
                    <FilterBar reverse={true} text="381 Answers Found"/>
                    <div className={ShowQuestionStyle["answers-container"]}>
                        <div className={ShowQuestionStyle["answers"]}>
                            <Answer author={answerObj.author} content={answerObj.content}/>
                        </div>
                        <div className={ShowQuestionStyle["question-tags"]}>
                            <QuestionTags/>
                        </div>
                    </div>
            </div>
        </div>
    );
};