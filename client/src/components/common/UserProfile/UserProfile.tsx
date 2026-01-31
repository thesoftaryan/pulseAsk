import UserProfileStyle from "./UserProfile.module.css";

interface UserProfileProps{
    onClick?: React.MouseEventHandler<HTMLDivElement>;
    className? : string;
};

export const UserProfile : React.FC<UserProfileProps> = ({onClick, className})=>{
    return (
        <>
            <div className={`${UserProfileStyle["container"]}`} onClick={onClick}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzR0bIMZ71HVeR5zF4PihQaDvTQQk6bsVERw&s" className={`${UserProfileStyle["profile-image"]} ${className}`}/>
            </div>
        </>
    );
}