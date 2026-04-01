import UserProfileStyle from "./UserProfile.module.css";

import UserIcon from "../../../assets/images/user.png";

interface UserProfileProps{
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    src?: string;
    small?:boolean;
    className? : string;
    color?: string;
};

export const UserProfile : React.FC<UserProfileProps> = ({onClick, src, small, className, color})=>{
    return (
        <>
            <div className={`${UserProfileStyle["container"]} ${className} ${color? UserProfileStyle[color]: ""} ${small? UserProfileStyle["small"]:""}`} onClick={onClick}>
                <img src={src??UserIcon} className={`${UserProfileStyle["profile-image"]}`}/>
            </div>
        </>
    );
}