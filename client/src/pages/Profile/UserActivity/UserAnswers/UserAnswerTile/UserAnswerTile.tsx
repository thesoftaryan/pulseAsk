import UserAnswerTileStyle from "./UserAnswerTile.module.css";

import { UserProfile } from "../../../../../components/common/UserProfile/UserProfile";

import Button from "../../../../../components/common/Button/Button";
import { relativeTimeFormat } from "../../../../../utils/formatDateTime.util";
import type { AnswerInterface } from "../../../../../types/ApiResponse/answer.type";
import { useSafeNavigate } from "../../../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../../../routes/routesConstants";

interface UserAnswerTileProps{
    answer: AnswerInterface,
    level1?: boolean;
}

export const UserAnswerTile : React.FC<UserAnswerTileProps> = ({answer, level1})=>{

    const {safeNavigate} = useSafeNavigate();
    
    return (
        <>
            <div className={`${UserAnswerTileStyle["container"]} ${level1? UserAnswerTileStyle["level1-container"]:""}`}>
                <div className={UserAnswerTileStyle["header"]}>
                    <UserProfile onClick={()=>{safeNavigate(homeRoutes.profile+`/${answer.author.userName}`)}} className={UserAnswerTileStyle["user-profile"]}/>
                    <div onClick={()=>{safeNavigate(homeRoutes.profile+`/${answer.author.userName}`)}} className={UserAnswerTileStyle["user-data"]}>
                        {answer.author.firstName} {answer.author.lastName}
                        <div className={UserAnswerTileStyle["user-education"]}>
                            {/* User Education detail will go here */}
                            {answer.author.college}
                        </div>
                    </div>
                    <div className={UserAnswerTileStyle["time-asked"]}>{relativeTimeFormat(answer.askedAt)}</div>
                </div>
                <div className={UserAnswerTileStyle["answer-wrapper"]}>
                    {answer.contentHTML}
                </div>
                <div className={UserAnswerTileStyle["footer"]}>
                    <Button text="See Question" isSmall={true} onClick={()=>safeNavigate(homeRoutes.question+`/${answer.qid._id}/${answer.qid.slug}`)}/>
                </div>
            </div>
        </>
    );
}