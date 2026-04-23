import { TagChip } from "../TagChip/TagChip";
import Button from "../Button/Button";

import QuestionStyle from "./Question.module.css";

// import type { TagInterface } from "../../../types/question.types";

import TagIcon from "../../../assets/icons/tag.svg?react";
import RankIcon from "../../../assets/icons/general/rank.svg?react";

import ReportIcon from "../../../assets/icons/general/report.svg?react";
import BookmarkIcon from "../../../assets/icons/general/bookmark.svg?react";
import { Icon } from "../Icon/Icon";
// import type { User } from "../../../types/user.types";
// import type { ReactElement } from "react";
// import type { TagPayload } from "../../../types/ApiRequest/tag.type";
// import type { UserInterface } from "../../../types/ApiResponse/user.type";
import type { QuestionInterface } from "../../../types/ApiResponse/question.type";
import { relativeTimeFormat } from "../../../utils/formatDateTime.util";
import { Answer } from "../Answer/Answer";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../routes/routesConstants";
// import { UserProfile } from "../UserProfile/UserProfile";

const NoAnswerMessage = (question: QuestionInterface)=>{
    const {safeNavigate} = useSafeNavigate();
    return (
        <div className={QuestionStyle["no-answer-wrapper"]}>
            <div className={QuestionStyle["content-wrapper"]}>
                <RankIcon className={QuestionStyle["rank-icon"]}/>
                <div className={QuestionStyle["message"]}>
                    No answers available, Be the first one to answer
                </div>
            </div>
            <div className={QuestionStyle["answer-now-button"]} >
                <Button text="Answer Now" onClick={()=>safeNavigate(homeRoutes.question+`/${question._id}/${question.slug}`)}/>
            </div>
        </div>
    );
}

interface QuestionProps{
    question: QuestionInterface;
    onClick?:VoidFunction;
}

export const Question:React.FC<QuestionProps> = ({question, onClick})=>{
    
    const {safeNavigate} = useSafeNavigate();

    return (
        <>
            <div className={QuestionStyle["container"]} onClick={onClick}>
                <div className={QuestionStyle["header"]}>
                    <div className={QuestionStyle["title"]} onClick={()=>{safeNavigate(homeRoutes.question+`/${question._id}/${question.slug}`)}}>
                        {question.title}
                    </div>
                    <div className={QuestionStyle["actions"]}>
                        <Icon level2={true} IconData={ReportIcon}/>
                        <Icon level2={true} IconData={BookmarkIcon}/>
                    </div>
                    <div className={QuestionStyle["meta-data"]}>{relativeTimeFormat(question.askedAt)}</div>
                </div>
                <div className={QuestionStyle["wrapper"]}>
                    {
                        (question.bestAnswer)?
                        <Answer answer={question.bestAnswer}/>
                        :
                        NoAnswerMessage(question)
                    }
                </div>
                <div className={QuestionStyle["footer"]}>
                    <TagIcon className={QuestionStyle["icon"]}/>
                    <div className={QuestionStyle["tags"]}>
                        {
                            question.tags.map((tag)=>{
                                return <TagChip slug={tag.slug} key={tag._id} text={tag.name} color={tag.color} />
                            })
                        }
                    </div>
                    {/* <UserProfile className={QuestionStyle["user-profile"]}/>
                    <div className={QuestionStyle["user-data"]}>
                        {question.author.firstName + " " + (question.author.lastName??"")}
                        <div className={QuestionStyle["user-education"]}>
                            {question.author.college??""}
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
}