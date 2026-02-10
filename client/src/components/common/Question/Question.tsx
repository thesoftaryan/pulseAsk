import { TagChip } from "../TagChip/TagChip";
import Button from "../Button/Button";

import QuestionStyle from "./Question.module.css";
import type { TagInterface } from "../../../types/question.types";

import TagIcon from "../../../assets/icons/tag.svg?react";
import RankIcon from "../../../assets/icons/general/rank.svg?react";

import ReportIcon from "../../../assets/icons/general/report.svg?react";
import BookmarkIcon from "../../../assets/icons/general/bookmark.svg?react";
import { Icon } from "../Icon/Icon";
import type { User } from "../../../types/user.types";
import type { ReactElement } from "react";

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

interface QuestionProps{
    id? : string;
    author? : User;
    title : string;
    tags? : Array<TagInterface>;
    best_answer? : ReactElement<any, any>;
    onClick?:VoidFunction;
}

export const Question:React.FC<QuestionProps> = ({title, best_answer, onClick})=>{
    return (
        <>
            <div className={QuestionStyle["container"]}>
                <div className={QuestionStyle["header"]}>
                    <div className={QuestionStyle["title"]} onClick={onClick}>
                        {title}
                    </div>
                    <div className={QuestionStyle["actions"]}>
                        <Icon level2={true} IconData={ReportIcon}/>
                        <Icon level2={true} IconData={BookmarkIcon}/>
                    </div>
                    <div className={QuestionStyle["meta-data"]}>2h ago</div>
                </div>
                <div className={QuestionStyle["answer-wrapper"]}>
                {
                    (best_answer)??
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