import { TagChip } from "../TagChip/TagChip";
import Button from "../Button/Button";

import QuestionStyle from "./Question.module.css";

// import type { TagInterface } from "../../../types/question.types";

import TagIcon from "../../../assets/icons/tag.svg?react";
import RankIcon from "../../../assets/icons/general/rank.svg?react";

import ShareIcon from "../../../assets/icons/general/share.svg?react";
import ReportIcon from "../../../assets/icons/general/report.svg?react";
import BookmarkIcon from "../../../assets/icons/general/bookmark.svg?react";
import BookmarkFillIcon from "../../../assets/icons/general/bookmark_fill.svg?react";
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
import { useQuestionHandler } from "./Question.handler";
import { useEffect, useState } from "react";
import { showToast } from "../../../utils/toast.util";
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
    level1Comments?:boolean;
    onClick?:VoidFunction;
}

export const Question:React.FC<QuestionProps> = ({question, onClick, level1Comments=false})=>{
    
    const {safeNavigate} = useSafeNavigate();

    const [bookmarked, setBookmarked] = useState(false);
    const {
        isBookmarkedHandler,
        toggleBookmarkHandler
    } = useQuestionHandler(setBookmarked);

    useEffect(()=>{
        isBookmarkedHandler(question._id);
    }, []);

    const handleToggleBookmark = ()=>{
        toggleBookmarkHandler(question._id, !bookmarked);
    }

    const shareQuestion = async () => {
        const url = window.location.href+`#${question._id}`;

        if (navigator.share) {
            try {
            await navigator.share({
                title: "PulseAsk",
                text: question.title,
                url,
            });
            return;
            } catch {
            }
        }
        await navigator.clipboard.writeText(url);
        showToast.success("Link copied to clipboard!");
    };

    return (
        <>
            <div id={question._id} className={QuestionStyle["container"]} onClick={onClick}>
                <div className={QuestionStyle["header"]}>
                    <div className={QuestionStyle["title"]} onClick={()=>{safeNavigate(homeRoutes.question+`/${question._id}/${question.slug}`)}}>
                        {question.title}
                    </div>
                    <div className={QuestionStyle["actions"]}>
                        <Icon level2={true} IconData={ReportIcon}  onClick={()=>showToast.info("Thanks for reporting, we'll look into it")}/>
                        <Icon onClick={handleToggleBookmark} level2={true} IconData={(bookmarked)?BookmarkFillIcon:BookmarkIcon}/>
                        <Icon level2={true} IconData={ShareIcon} onClick={shareQuestion}/>
                    </div>
                    <div className={QuestionStyle["meta-data"]}>{relativeTimeFormat(question.askedAt)}</div>
                </div>
                <div className={QuestionStyle["wrapper"]}>
                    {
                        (question.bestAnswer)?
                        <Answer answer={question.bestAnswer} level1Comments={level1Comments}/>
                        :
                        NoAnswerMessage(question)
                    }
                </div>
                <div className={QuestionStyle["footer"]}>
                    <TagIcon className={QuestionStyle["icon"]}/>
                    <div className={QuestionStyle["tags"]}>
                        {
                            question.tags.length===0
                            &&
                            <div className={QuestionStyle["label"]}>No tags available</div>
                        }
                        {
                            question.tags.map((tag)=>{
                                return <TagChip slug={tag.slug} key={tag._id} text={tag.name} color={tag.color} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    );
}