import AnswerStyle from "./Answer.module.css";

import ReportIcon from "../../../assets/icons/general/report.svg?react";
import BookmarkIcon from "../../../assets/icons/general/bookmark.svg?react";
import ShareIcon from "../../../assets/icons/general/share.svg?react"

import UpvoteIcon from "../../../assets/icons/general/upvote.svg?react";
import DownvoteIcon from "../../../assets/icons/general/downvote.svg?react";
import CommentIcon from "../../../assets/icons/general/comment.svg?react";
import LoadMoreIcon from "../../../assets/icons/general/load_more.svg?react";


import { UserProfile } from "../UserProfile/UserProfile";
import { Icon } from "../Icon/Icon";
import type { User } from "../../../types/user.types";
import { useState } from "react";
import { FilterBar } from "../../layout/FilterBar/FilterBar";

import { Comment } from "../Comment/Comment";
import Button from "../Button/Button";

interface AnswerProps{
    author : User;
    content : string;
    level1?: boolean;
    level1Comments?: boolean;
}

export const Answer : React.FC<AnswerProps> = ({author, content, level1, level1Comments})=>{
    const [isComment, setIsComment] = useState(false);
    
    return (
        <>
            <div className={`${AnswerStyle["container"]} ${level1? AnswerStyle["level1-container"]:""}`}>
                <div className={AnswerStyle["time-answered"]}>
                    12h ago
                </div>
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
                        <div className={AnswerStyle["comment-container"]}>
                            <div className={`${AnswerStyle["post-comment"]} ${level1Comments? AnswerStyle["level1-comments"]:""}`}>
                                <div className={AnswerStyle["user-profile"]}>
                                    <UserProfile/>
                                </div>
                                <input type="text" placeholder="Add your comment !" className={AnswerStyle["input-field"]}>
                                    
                                </input>
                                <div className={AnswerStyle["comment-submit-button"]}>
                                    <Button text="Post" isSmall={true}/>
                                </div>
                            </div>
                                <FilterBar text="21 comments" reverse={true} noFilter={true} level2={!level1Comments}/>
                            <div className={AnswerStyle["comments"]}>
                                <Comment level1={level1Comments}/>
                                <Comment level1={level1Comments}/>
                                <Comment level1={level1Comments}/>
                            </div>
                            <div className={AnswerStyle["load-more-button"]}>
                                <Button text="Load More Comments" isSmall={true} level1={level1Comments} level2={!level1Comments} Icon={LoadMoreIcon}/>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}