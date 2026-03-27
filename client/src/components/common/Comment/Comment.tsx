import type { CommentInterface } from "../../../types/ApiResponse/comment.typs";
import { relativeTimeFormat } from "../../../utils/formatDateTime.util";
import { UserProfile } from "../UserProfile/UserProfile"

import CommentStyle from "./Comment.module.css";

interface CommentProps{
    comment: CommentInterface,
    level1?: boolean;
}

export const Comment : React.FC<CommentProps> = ({comment, level1})=>{
    return (
        <div className={`${CommentStyle["container"]} ${level1? CommentStyle["level1"]:""}`}>
            <div className={CommentStyle["header"]}>
                <UserProfile className={CommentStyle["user-profile"]}/>
                <div className={CommentStyle["user-name"]}> {comment.author.firstName} {comment.author.lastName}</div>
                <div className={CommentStyle["comment-time"]}> . {relativeTimeFormat(comment.commentedAt)}</div>
            </div>
            <div className={CommentStyle["comment"]}>
                {comment.content}
            </div>
        </div>
    );

}