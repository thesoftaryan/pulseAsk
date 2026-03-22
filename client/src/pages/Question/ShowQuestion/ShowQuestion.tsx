import ShowQuestionStyle from "./ShowQuestion.module.css";

// Icons
import QuestionIcon from "../../../assets/icons/general/question.svg?react";
import UpvoteIcon from "../../../assets/icons/general/upvote.svg?react";
import DownvoteIcon from "../../../assets/icons/general/downvote.svg?react";
import BookmarkIcon from "../../../assets/icons/general/bookmark.svg?react";
import ReportIcon from "../../../assets/icons/general/report.svg?react";
import ReputationIcon from "../../../assets/icons/general/reputation.svg?react";
import LoadMoreIcon from "../../../assets/icons/general/load_more.svg?react";

import { Icon } from "../../../components/common/Icon/Icon";

// import {Image as ImageComponent} from "../../../components/common/Image/Image";
import { UserProfile } from "../../../components/common/UserProfile/UserProfile";
import Button from "../../../components/common/Button/Button";
import { FilterBar } from "../../../components/layout/FilterBar/FilterBar";
import { Answer } from "../../../components/common/Answer/Answer";

import { QuestionTags } from "./QuestionTags/QuestionTags";

import { useEffect, useState } from "react";

import TextEditor from "../../../components/common/TextEditor/TextEditor";
import type { JSONContent } from "@tiptap/react";

import type { AnswerInterface } from "../../../types/ApiResponse/answer.type";
import { useParams } from "react-router-dom";
import { useShowQuestionHandler } from "./ShowQuestion.handler";
import type { QuestionInterface } from "../../../types/ApiResponse/question.type";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../routes/routesConstants";
import { relativeTimeFormat } from "../../../utils/formatDateTime.util";


type QuestionParams = {
    qid: string;
    slug: string;
}

export const ShowQuestion = ()=>{

    const {replaceNavigate} = useSafeNavigate();
    const {qid, slug} = useParams<QuestionParams>();

    const initObj = {
        _id:"",
        askedAt: new Date(),
        author: {
            profile:"",
            firstName:"",
            lastName: "",
            reputationScore: 0,
        },
        description: "",
        descriptionHTML: "",
        slug: "",
        tags: [],
        title: "",
        voteCount: 0,
    };
    const [question, setQuestion] = useState<QuestionInterface>(initObj);

    const{fetchQuestionHandler} = useShowQuestionHandler(setQuestion);


    useEffect(()=>{
        if(qid){
            fetchQuestionHandler(qid, slug??"");
        }else{
            replaceNavigate(homeRoutes.home);
        }
    }, []);

    const answerObj : AnswerInterface = {
        _id:"something",
        questionId: "asd",
        askedAt:new Date(),
        voteCount: 0,
        author : {_id: "2", email: "thesoftaryan@gmail.com", firstName:"Aryan", lastName:"Maurya"},
        content : "Steps important for CPR: First of all make the person lie on his back and then you can do one thing and that is you have to search on youtube and then see there the actual steps, it is better to see than read.",
    }
    const [answerContent, setAnswerContent] = useState<JSONContent | null>(null);

    return (
        <div className={ShowQuestionStyle["container"]}>
            <div className={ShowQuestionStyle["main-content"]}>
                    <div className={ShowQuestionStyle["show-question-container"]}>
                        <div className={ShowQuestionStyle["question-title"]}>
                            <QuestionIcon className={ShowQuestionStyle["question-icon"]}/>
                            <div className={ShowQuestionStyle["title-text"]}>{question.title}</div>
                            <div className={ShowQuestionStyle["actions-container"]}>
                                <Icon IconData={BookmarkIcon} />
                                <Icon IconData={ReportIcon}/>
                            </div>
                        </div>
                        <div className={ShowQuestionStyle["question-content"]}>
                            {question.descriptionHTML}
                        </div>
                        <div className={ShowQuestionStyle["question-meta"]}>
                            <div className={ShowQuestionStyle["left"]}>
                                <div className={ShowQuestionStyle["question-time"]}>Asked <span className={ShowQuestionStyle["time-val"]}>{relativeTimeFormat(question.askedAt)}</span></div>
                                <Icon active={(question.voteCount>=0)?true:false} IconData={UpvoteIcon} text={(question.voteCount === 0)? "Upvote":(question.voteCount>0)?question.voteCount.toString():""} onClick={()=>{
                                    setQuestion(
                                        {
                                            ...question,
                                            voteCount: question.voteCount+1,
                                        }
                                    )
                                }}/>
                                <Icon IconData={DownvoteIcon} left={true} danger={(question.voteCount<0)?true:false} text={(question.voteCount<0)?question.voteCount.toString():""} onClick={()=>{
                                    setQuestion(
                                        {
                                            ...question,
                                            voteCount: question.voteCount-1,
                                        }
                                    )
                                }}/>
                            </div>
                            <div className={ShowQuestionStyle["right"]}>
                                <div className={ShowQuestionStyle["profile"]}>
                                    <UserProfile/>
                                </div>
                                <div className={ShowQuestionStyle["user-data"]}>
                                    <div className={ShowQuestionStyle["user-name"]}>
                                        {question.author.firstName} {question.author.lastName} 
                                    </div>
                                    <div className={ShowQuestionStyle["user-reputation"]}>
                                        <ReputationIcon className={ShowQuestionStyle["reputation-icon"]}/>
                                        <div className={ShowQuestionStyle["reputation-count"]}>
                                            {question.author.reputationScore}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={ShowQuestionStyle["submit-answer-container"]}>
                        {/* <textarea className={ShowQuestionStyle["submit-answer-textarea"]}/> */}
                        <TextEditor onChange={setAnswerContent} placeholder="Enter your Answer here!!"/>
                        <Button text="Post Answer" onClick={()=>{console.log(answerContent)}}/>
                    </div>
                    <div className={ShowQuestionStyle["answers-container"]}>
                        <div className={ShowQuestionStyle["answers"]}>
                            <FilterBar reverse={true} text="381 Answers Found"/>
                            <Answer author={answerObj.author} content={answerObj.content} level1={true}/>
                            <Answer author={answerObj.author} content={answerObj.content} level1={true}/>
                            <Answer author={answerObj.author} content={answerObj.content} level1={true}/>
                            <Answer author={answerObj.author} content={answerObj.content} level1={true}/>
                            <Answer author={answerObj.author} content={answerObj.content} level1={true}/>
                            <Answer author={answerObj.author} content={answerObj.content} level1={true}/>
                            <div className={ShowQuestionStyle["load-more-answers"]}>
                                <Button text="Load More Answers" isSmall={true} level1={true}  Icon={LoadMoreIcon}/>
                            </div>
                        </div>
                        <div className={ShowQuestionStyle["question-tags"]}>
                            <QuestionTags tags={question.tags}/>
                        </div>
                    </div>
            </div>
        </div>
    );
};