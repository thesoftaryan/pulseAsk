import AnswerStyle from "./Answer.module.css";

import ReportIcon from "../../../assets/icons/general/report.svg?react";
import BookmarkIcon from "../../../assets/icons/general/bookmark.svg?react";
import ShareIcon from "../../../assets/icons/general/share.svg?react"

import UpvoteIcon from "../../../assets/icons/general/upvote.svg?react";
import DownvoteIcon from "../../../assets/icons/general/downvote.svg?react";
import CommentIcon from "../../../assets/icons/general/comment.svg?react";

import type { AnswerInterface } from "../../../types/answer.types";
import { UserProfile } from "../UserProfile/UserProfile";
import { Icon } from "../Icon/Icon";

export const Answer : React.FC<AnswerInterface> = ({author, content})=>{
    return (
        <>
            <div className={AnswerStyle["container"]}>
                <div className={AnswerStyle["header"]}>
                    <UserProfile className={AnswerStyle["user-profile"]}/>
                    <div className={AnswerStyle["user-data"]}>
                        {author.first_name + " " + author.last_name}
                        <div className={AnswerStyle["user-education"]}>
                            {/* User Education detail will go here */}
                            Khandani Institute of Technology
                        </div>
                    </div>

                </div>
                <div className={AnswerStyle["answer-wrapper"]}>
                    {content}
                </div>
                <div className={AnswerStyle["footer"]}>
                    <div className={AnswerStyle["left"]}>
                        <Icon active={true} IconData={UpvoteIcon} text="Upvote"/>
                        <Icon IconData={DownvoteIcon}/>
                        <Icon IconData={CommentIcon}/>
                    </div>
                    <div className={AnswerStyle["right"]}>
                        <Icon IconData={ReportIcon}/>
                        <Icon IconData={BookmarkIcon}/>
                        <Icon IconData={ShareIcon}/>
                    </div>
                </div>
            </div>
        </>
    );
}