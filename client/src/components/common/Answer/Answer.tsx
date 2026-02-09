import AnswerStyle from "./Answer.module.css";

import ReportIcon from "../../../assets/icons/general/report.svg?react";
import BookmarkIcon from "../../../assets/icons/general/bookmark.svg?react";
import ShareIcon from "../../../assets/icons/general/share.svg?react"

import UpvoteIcon from "../../../assets/icons/general/upvote.svg?react";
import DownvoteIcon from "../../../assets/icons/general/downvote.svg?react";
import CommentIcon from "../../../assets/icons/general/comment.svg?react";

import { UserProfile } from "../UserProfile/UserProfile";
import { Icon } from "../Icon/Icon";
import type { User } from "../../../types/user.types";
import { useState } from "react";
import { FilterBar } from "../../layout/FilterBar/FilterBar";

import { Comment } from "../Comment/Comment";

interface AnswerProps{
    author : User;
    content : string;
    level1?: boolean;
}

export const Answer : React.FC<AnswerProps> = ({author, content, level1})=>{
    const [isComment, setIsComment] = useState(false);
    
    return (
        <>
            <div className={`${AnswerStyle["container"]} ${level1? AnswerStyle["level1-container"]:""}`}>
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
                        <Icon level2={level1} active={true} IconData={UpvoteIcon} text="Upvote"/>
                        <Icon level2={level1} IconData={DownvoteIcon}/>
                        <Icon level2={level1} IconData={CommentIcon} onClick={()=>{setIsComment(!isComment)}}/>
                    </div>
                    <div className={AnswerStyle["right"]}>
                        <Icon level2={level1} IconData={ReportIcon}/>
                        <Icon level2={level1} IconData={BookmarkIcon}/>
                        <Icon level2={level1} IconData={ShareIcon}/>
                    </div>
                </div>
                {
                    isComment && (
                        <div className="comment-container">
                            <div className="post-comment">
                                <div className="profile"></div>
                                <div className="input-field"></div>
                                <div className="comment-submit-button"></div>
                            </div>
                            <FilterBar text="21 comments" reverse={true} noFilter={true} level2={true}/>
                            <div className="comments">
                                <Comment/>
                                <Comment/>
                                <Comment/>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}