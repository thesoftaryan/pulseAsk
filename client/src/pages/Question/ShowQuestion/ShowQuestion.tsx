import ShowQuestionStyle from "./ShowQuestion.module.css";

// Icons
import QuestionIcon from "../../../assets/icons/general/question.svg?react";
import UpvoteIcon from "../../../assets/icons/general/upvote.svg?react";
import DownvoteIcon from "../../../assets/icons/general/downvote.svg?react";
import BookmarkIcon from "../../../assets/icons/general/bookmark.svg?react";
import BookmarkFillIcon from "../../../assets/icons/general/bookmark_fill.svg?react";
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

import TextEditor, { type EditorContentType } from "../../../components/common/TextEditor/TextEditor";

import type { AnswerInterface } from "../../../types/ApiResponse/answer.type";
import { useParams } from "react-router-dom";
import { useShowQuestionHandler } from "./ShowQuestion.handler";
import type { QuestionInterface } from "../../../types/ApiResponse/question.type";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../routes/routesConstants";
import { relativeTimeFormat } from "../../../utils/formatDateTime.util";
import type { PostAnswerPayload } from "../../../types/ApiRequest/answer.type";
import { postAnswerValidator } from "./ShowQuestion.validator";
import InlineError from "../../../components/common/InlineError/InlineError";



type QuestionParams = {
    qid: string;
    slug: string;
}

export const ShowQuestion = ()=>{

    const {replaceNavigate, safeNavigate} = useSafeNavigate();
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

    const [voting, setVoting] = useState(false);

    const [answerContent, setAnswerContent] = useState<EditorContentType>();

    const [answers, setAnswers] = useState<AnswerInterface[]>([]);
    
    const [errors, setErrors] = useState<Partial<PostAnswerPayload>>({});
    
    const [posting, setPosting] = useState(false);

    const [bookmarked, setBookmarked] = useState(false);

    const{
        fetchQuestionHandler, 
        fetchAnswersHandler, 
        postAnswerHandler, 
        voteQuestionHandler,
        isBookmarkedHandler,
        toggleBookmarkHandler,
    } = useShowQuestionHandler(setQuestion, setAnswers, setBookmarked);


    useEffect(()=>{
        if(qid){
            fetchQuestionHandler(qid, slug??"");
            fetchAnswersHandler({qid});
        }else{
            replaceNavigate(homeRoutes.home);
        }
    }, [qid, slug]);

    useEffect(()=>{
        if(question._id!==""){
            isBookmarkedHandler(question._id);
        }
    }, [question]);

    const handlePostAnswer = async ()=>{

        const postAnswerPaylod : PostAnswerPayload = {
            qid: qid!,
            content: answerContent?.text??"",
            contentHTML: answerContent?.html??"",
        }
        const valError = postAnswerValidator(postAnswerPaylod);
        setErrors(valError);
        if(Object.keys(valError).length===0){
            setPosting(true);
            await postAnswerHandler(postAnswerPaylod);
            await fetchAnswersHandler({qid:qid!});
            setPosting(false);
        }
    }


    const handleToggleBookmark = ()=>{
        toggleBookmarkHandler(question._id, !bookmarked);
    }
    

    return (
        <div className={ShowQuestionStyle["container"]}>
            <div className={ShowQuestionStyle["main-content"]}>
                    <div className={ShowQuestionStyle["show-question-container"]}>
                        <div className={ShowQuestionStyle["question-title"]}>
                            <QuestionIcon className={ShowQuestionStyle["question-icon"]}/>
                            <div className={ShowQuestionStyle["title-text"]}>{question.title}</div>
                            <div className={ShowQuestionStyle["actions-container"]}>
                                <Icon onClick={handleToggleBookmark} isLarge={true} IconData={(bookmarked)?BookmarkFillIcon:BookmarkIcon}/>
                                <Icon isLarge={true} IconData={ReportIcon}/>
                            </div>
                        </div>
                        <div className={ShowQuestionStyle["question-content"]}>
                            {question.descriptionHTML}
                        </div>
                        <div className={ShowQuestionStyle["question-meta"]}>
                            <div className={ShowQuestionStyle["left"]}>
                                <div className={ShowQuestionStyle["question-time"]}>Asked <span className={ShowQuestionStyle["time-val"]}>{relativeTimeFormat(question.askedAt)}</span></div>
                                <Icon disabled={voting} active={(question.voteCount>=0)?true:false} IconData={UpvoteIcon} text={(question.voteCount === 0)? "Upvote":(question.voteCount>0)?question.voteCount.toString():""} 
                                onClick={()=>{
                                    voteQuestionHandler(1, question._id, question.author._id??"", setVoting);
                                }}/>
                                <Icon disabled={voting} IconData={DownvoteIcon} left={true} danger={(question.voteCount<0)?true:false} text={(question.voteCount<0)?question.voteCount.toString():""} 
                                onClick={()=>{
                                    voteQuestionHandler(-1, question._id, question.author._id??"", setVoting);
                                }}/>
                            </div>
                            <div  onClick={()=>{safeNavigate(homeRoutes.profile+`/${question.author.userName}`)}}  className={ShowQuestionStyle["right"]}>
                                <UserProfile small={true} src={(question.author.profile!=="")? question.author.profile:undefined} className={ShowQuestionStyle["user-profile"]}/>
                                <div className={ShowQuestionStyle["user-data"]}>
                                    <div className={ShowQuestionStyle["user-name"]}>
                                        {question.author.firstName} {question.author.lastName} 
                                    </div>
                                    <div className={`${ShowQuestionStyle["user-reputation"]}  ${((question.author.reputationScore??0)<0)? ShowQuestionStyle["danger"]:""}`}>
                                        <ReputationIcon className={`${ShowQuestionStyle["reputation-icon"]}  ${((question.author.reputationScore??0)<0)? ShowQuestionStyle["danger"]:""}`}/>
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
                        {errors.content && <InlineError message={errors.content}/>}
                        <Button loading={posting} text="Post Answer" onClick={()=>{console.log(answerContent); handlePostAnswer();}}/>
                    </div>
                    <div className={ShowQuestionStyle["answers-container"]}>
                        <div className={ShowQuestionStyle["answers"]}>
                            <FilterBar reverse={true} text={`${answers.length} Answers Found`}/>
                            {/* <Answer author={answerObj.author} content={answerObj.content} level1={true}/> */}
                            {
                                (answers.length===0)
                                &&
                                <p className="system-wide-placeholder"> No answers Available yet, Be the first one to answer</p>
                            }
                            {
                                (answers.length!==0)
                                &&
                                <>
                                {
                                answers.map((answer)=>{
                                    return <Answer key={answer._id} answer={answer} level1={true}/>
                                })
                                }
                                </>
                            }
                            {
                                (answers.length!==0)
                                &&
                                <div className={ShowQuestionStyle["load-more-answers"]}>
                                <Button text="Show More Answers" isSmall={true} level1={true}  Icon={LoadMoreIcon}/>
                                </div>
                            }
                        </div>
                        <div className={ShowQuestionStyle["question-tags"]}>
                            <QuestionTags tags={question.tags}/>
                        </div>
                    </div>
            </div>
        </div>
    );
};