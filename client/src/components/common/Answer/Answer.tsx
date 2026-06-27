import AnswerStyle from "./Answer.module.css";

import ReportIcon from "../../../assets/icons/general/report.svg?react";
import BookmarkIcon from "../../../assets/icons/general/bookmark.svg?react";
import BookmarkFillIcon from "../../../assets/icons/general/bookmark_fill.svg?react";
import ShareIcon from "../../../assets/icons/general/share.svg?react"

import UpvoteIcon from "../../../assets/icons/general/upvote.svg?react";
import DownvoteIcon from "../../../assets/icons/general/downvote.svg?react";
import CommentIcon from "../../../assets/icons/general/comment.svg?react";
// import LoadMoreIcon from "../../../assets/icons/general/load_more.svg?react";


import { UserProfile } from "../UserProfile/UserProfile";
import { Icon } from "../Icon/Icon";
// import type { User } from "../../../types/user.types";
import { useEffect, useState } from "react";
import { FilterBar } from "../../layout/FilterBar/FilterBar";

import { Comment } from "../Comment/Comment";
import Button from "../Button/Button";
import type { AnswerInterface } from "../../../types/ApiResponse/answer.type";
import { relativeTimeFormat } from "../../../utils/formatDateTime.util";

import { useAnswerHandler } from "./Answer.handler";
import type { CommentInterface } from "../../../types/ApiResponse/comment.typs";
import { Spinner } from "../Spinner/Spinner";
import InlineError from "../InlineError/InlineError";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../routes/routesConstants";

import DOMPurify from "dompurify";
import { showToast } from "../../../utils/toast.util";

interface AnswerProps{
    answer: AnswerInterface,
    level1?: boolean;
    level1Comments?: boolean;
}

export const Answer : React.FC<AnswerProps> = ({answer, level1, level1Comments})=>{

    const {safeNavigate} = useSafeNavigate();

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [bookmarked, setBookmarked] = useState(true);

    const [commentContent, setCommentContent] = useState("");
    const [isComment, setIsComment] = useState(false);
    const [comments, setComments] = useState<CommentInterface[]>([]);

    const [fetching, setFetching] = useState(false);
    const [postingComment, setPostingComment] = useState(false);
    const [voting, setVoting] = useState(false);
    const [voteCount, setVoteCount] = useState(answer.voteCount);

    const {
        isBookmarkedHandler,
        toggleBookmarkHandler,
        voteAnswerHandler, 
        fetchAnswerCommentsHandler, 
        postAnswerCommentHandler
    } = useAnswerHandler(
        setVoting,
        setVoteCount,
        setComments,
        setBookmarked,
    );

    useEffect(()=>{
        isBookmarkedHandler(answer._id);
        fetchAnswerCommentsHandler(answer._id, setFetching);
    }, []);

    const handleCommentPost = async ()=>{
        const newComment = commentContent.trim();
        if(!newComment || newComment.length < 10){
            setErrors({commentContent:"Comment is required to be of at least 10 characters"})
            return;
        }
        await postAnswerCommentHandler(answer._id, commentContent, setPostingComment, setCommentContent);
        await fetchAnswerCommentsHandler(answer._id, setFetching);
    }

    const handleToggleBookmark = ()=>{
        toggleBookmarkHandler(answer._id, !bookmarked);
    }

    const shareAnswer = async () => {
        const url = window.location.href+`#${answer._id}`;

        if (navigator.share) {
            try {
            await navigator.share({
                title: "PulseAsk",
                text: "Look into this answer on pulseAsk",
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
            <div id={answer._id} className={`${AnswerStyle["container"]} ${level1? AnswerStyle["level1-container"]:""}`}>
                <div className={AnswerStyle["time-answered"]}>
                    {relativeTimeFormat(answer.askedAt)}
                </div>
                <div  onClick={()=>{safeNavigate(homeRoutes.profile+`/${answer.author.userName}`)}}  className={AnswerStyle["header"]}>
                    <UserProfile small={true} src={answer.author.profile} className={AnswerStyle["user-profile"]}/>
                    <div className={AnswerStyle["user-data"]}>
                        {answer.author.firstName} {answer.author.lastName}
                        <div className={AnswerStyle["user-education"]}>
                            {/* User Education detail will go here */}
                            {answer.author.college}
                        </div>
                    </div>

                </div>
                <div 
                    className={AnswerStyle["answer-wrapper"]}
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(answer.contentHTML),
                    }}
                />
                <div className={AnswerStyle["footer"]}>
                    <div className={AnswerStyle["left"]}>
                        <Icon disabled={voting} active={(voteCount>=0)? true:false} text={(voteCount>0)? voteCount.toString():"Upvote"} level2={level1} IconData={UpvoteIcon} 
                        onClick={()=>{
                            voteAnswerHandler(1, answer._id, answer.author._id??"");
                        }}    
                        />
                        <Icon disabled={voting} danger={(voteCount<0)? true:false} text={(voteCount<0)? voteCount.toString():""} left={true} level2={level1} IconData={DownvoteIcon}  
                        onClick={()=>{
                            voteAnswerHandler(-1, answer._id, answer.author._id??"");
                        }}    
                        />
                        <Icon active={isComment} level2={level1} IconData={CommentIcon} onClick={()=>{setIsComment(!isComment)}}/>
                    </div>
                    <div className={AnswerStyle["right"]}>
                        <Icon level2={level1} IconData={ReportIcon} onClick={()=>showToast.info("Thanks for reporting, we'll look into it")}/>
                        <Icon  onClick={handleToggleBookmark} level2={level1} IconData={bookmarked? BookmarkFillIcon:BookmarkIcon}/>
                        <Icon level2={level1} IconData={ShareIcon} onClick={shareAnswer}/>
                    </div>
                </div>
                {
                    isComment && (
                        <div className={AnswerStyle["comment-container"]}>
                            <div className={`${AnswerStyle["post-comment"]} ${level1Comments? AnswerStyle["level1-comments"]:""}`}>
                                <UserProfile small={true} src={answer.author.profile} className={AnswerStyle["user-profile-small"]}/>

                                <input value={commentContent} type="text" placeholder="Add your comment !" className={AnswerStyle["input-field"]}
                                    onChange={(e)=>{
                                        setCommentContent(e.target.value);
                                        setErrors({...errors, commentContent: ""});
                                    }}
                                    onKeyDown={(e)=>{
                                        if(e.key==="Enter"){
                                            handleCommentPost();
                                        }
                                    }}    
                                />
                                
                                <div className={AnswerStyle["comment-submit-button"]}>
                                    <Button loading={postingComment} text="Post" isSmall={true}
                                    onClick={handleCommentPost}
                                    />
                                </div>
                            </div>
                                {errors.commentContent && <InlineError message={errors.commentContent}/>}

                                {
                                    comments.length!==0
                                    &&
                                    // <Divider text={`${comments.length} comments`}/>
                                    <FilterBar text={`${comments.length} comments`} reverse={true} noFilter={true} noSort={true} level2={!level1Comments}/>
                                }
                            <div className={AnswerStyle["comments"]}>
                                {
                                    fetching && <Spinner/>
                                }
                                {
                                    comments.length===0 && !fetching
                                    &&
                                    <p className="system-wide-placeholder">No Comments, be the first one to comment</p>
                                }
                                {
                                    comments.map((comment)=>{
                                        return <Comment key={comment._id} comment={comment} level1={level1Comments}/>;
                                    })
                                }
                            </div>
                            {/* {
                                comments.length!==0
                                &&
                                <div className={AnswerStyle["load-more-button"]}>
                                <Button text="Show More Comments" isSmall={true} level1={level1Comments} level2={!level1Comments} Icon={LoadMoreIcon}/>
                                </div>
                            } */}
                        </div>
                    )
                }
            </div>
        </>
    );
}