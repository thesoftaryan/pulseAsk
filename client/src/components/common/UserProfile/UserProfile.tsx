import UserProfileStyle from "./UserProfile.module.css";

export const UserProfile = ()=>{
    return (
        <>
            <div className={UserProfileStyle["container"]}>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzR0bIMZ71HVeR5zF4PihQaDvTQQk6bsVERw&s" className={UserProfileStyle["profile-image"]}/>
            </div>
        </>
    );
}