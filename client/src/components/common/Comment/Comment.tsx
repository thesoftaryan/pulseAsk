import { UserProfile } from "../UserProfile/UserProfile"

import CommentStyle from "./Comment.module.css";

interface CommentProps{
    level1?: boolean;
}

export const Comment : React.FC<CommentProps> = ({level1})=>{
    return (
        <div className={`${CommentStyle["container"]} ${level1? CommentStyle["level1"]:""}`}>
            <div className={CommentStyle["header"]}>
                <UserProfile className={CommentStyle["user-profile"]}/>
                <div className={CommentStyle["user-name"]}> Messi Mishra</div>
                <div className={CommentStyle["comment-time"]}> . 2h ago</div>
            </div>
            <div className={CommentStyle["comment"]}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati expedita unde ipsa possimus eum! Iure aliquam id pariatur aperiam, facere in repellendus laudantium ullam reiciendis exercitationem? Temporibus id eos, pariatur ipsum expedita quas enim, molestiae laborum quidem nisi error modi rerum dolores. Modi voluptatibus sunt nam iste illum, accusantium atque?
            </div>
        </div>
    );

}