import ImageStyle from "./Image.module.css";

interface ImageProps{
    path : string;
}

export const Image : React.FC<ImageProps> = ({path})=>{
    return (
        <div className={ImageStyle["container"]}>
            <img src={path} alt="image" className={ImageStyle["image"]}/>
        </div>
    );
}