import UserProfileStyle from "./UserProfile.module.css";

import UserIcon from "../../../assets/images/user.png";

interface UserProfileProps{
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    className? : string;
};

export const UserProfile : React.FC<UserProfileProps> = ({onClick, className})=>{
    return (
        <>
            <div className={`${UserProfileStyle["container"]} ${className}`} onClick={onClick}>
                <img src={UserIcon} className={`${UserProfileStyle["profile-image"]}`}/>
            </div>
        </>
    );
}