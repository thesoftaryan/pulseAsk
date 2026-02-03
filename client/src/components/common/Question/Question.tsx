import { TagChip } from "../TagChip/TagChip";
import Button from "../Button/Button";

import QuestionStyle from "./Question.module.css";
import type { QuestionInterface } from "../../../types/question.types";

import TagIcon from "../../../assets/icons/tag.svg?react";
import RankIcon from "../../../assets/icons/general/rank.svg?react";

import ReportIcon from "../../../assets/icons/general/report.svg?react";
import BookmarkIcon from "../../../assets/icons/general/bookmark.svg?react";

const NoAnswerMessage = ()=>{
    return (
        <>
            <RankIcon className={QuestionStyle["rank-icon"]}/>
            <div className={QuestionStyle["message"]}>
                No answers available, Be the first one to answer
            </div>
            <Button className={QuestionStyle["answer-now-button"]} text="Answer Now"/>
        </>
    );
}

export const Question:React.FC<QuestionInterface> = ({title, best_answer})=>{
    return (
        <>
            <div className={QuestionStyle["container"]}>
                <div className={QuestionStyle["header"]}>
                    <div className={QuestionStyle["title"]}>
                        {title}
                    </div>
                    <div className={QuestionStyle["actions"]}>
                        <div className={QuestionStyle["action-icon-container"]}>
                            <ReportIcon  className={QuestionStyle["action-icon"]}/>
                        </div>
                        <div className={QuestionStyle["action-icon-container"]}>
                            <BookmarkIcon  className={QuestionStyle["action-icon"]}/>
                        </div>
                    </div>
                    <div className={QuestionStyle["meta-data"]}>2h ago</div>
                </div>
                <div className={QuestionStyle["answer-wrapper"]}>
                {
                    (best_answer)?
                    "Answer Component will be here"
                    :
                    <NoAnswerMessage/>
                }
                </div>
                <div className={QuestionStyle["footer"]}>
                    <TagIcon className={QuestionStyle["icon"]}/>
                    <div className={QuestionStyle["tags"]}>
                        <TagChip text="Neumonia" color="red"/>
                        <TagChip text="Heart" color="blue"/>
                    </div>
                </div>
            </div>
        </>
    );
}