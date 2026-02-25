import UserAnswerTileStyle from "./UserAnswerTile.module.css";

import { UserProfile } from "../../../../../components/common/UserProfile/UserProfile";

import type { User } from "../../../../../types/user.types";
import Button from "../../../../../components/common/Button/Button";

interface UserAnswerTileProps{
    author : User;
    content : string;
    level1?: boolean;
}

export const UserAnswerTile : React.FC<UserAnswerTileProps> = ({author, content, level1})=>{

    
    return (
        <>
            <div className={`${UserAnswerTileStyle["container"]} ${level1? UserAnswerTileStyle["level1-container"]:""}`}>
                <div className={UserAnswerTileStyle["header"]}>
                    <UserProfile className={UserAnswerTileStyle["user-profile"]}/>
                    <div className={UserAnswerTileStyle["user-data"]}>
                        {author.first_name + " " + author.last_name}
                        <div className={UserAnswerTileStyle["user-education"]}>
                            {/* User Education detail will go here */}
                            Khandani Institute of Technology
                        </div>
                    </div>

                </div>
                <div className={UserAnswerTileStyle["answer-wrapper"]}>
                    {content}
                </div>
                <div className={UserAnswerTileStyle["footer"]}>
                    <Button text="See Question" isSmall={true}/>
                </div>
            </div>
        </>
    );
}