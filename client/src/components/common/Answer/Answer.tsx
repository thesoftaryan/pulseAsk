import AnswerStyle from "./Answer.module.css";

import ReportIcon from "../../../assets/icons/general/report.svg?react";
import BookmarkIcon from "../../../assets/icons/general/bookmark.svg?react";
import type { AnswerInterface } from "../../../types/answer.types";
import { UserProfile } from "../UserProfile/UserProfile";
import { Icon } from "../Icon/Icon";

export const Answer : React.FC<AnswerInterface> = ({author, content})=>{
    return (
        <>
            <div className={AnswerStyle["container"]}>
                <div className={AnswerStyle["header"]}>
                    <UserProfile className={AnswerStyle["user-profile"]}/>
                    <div className={AnswerStyle["user-name"]}>
                        {author.first_name + " " + author.last_name}
                    </div>
                    <div className={AnswerStyle["user-education"]}>
                        {/* User Education detail will go here */}
                        Khandani Institute of Technology
                    </div>
                </div>
                <div className={AnswerStyle["answer-wrapper"]}>
                    {content}
                </div>
                <div className={AnswerStyle["footer"]}>
                    <div className={AnswerStyle["left"]}>

                    </div>
                    <div className={AnswerStyle["right"]}>
                        <Icon IconData={BookmarkIcon} text="Bookmark"/>
                        <Icon IconData={ReportIcon} text="Bookmark"/>
                    </div>
                </div>
            </div>
        </>
    );
}