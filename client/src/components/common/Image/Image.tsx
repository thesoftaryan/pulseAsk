import ImageStyle from "./Image.module.css";

interface ImageProps{
    path : string;
    className?: string;
}

export const Image : React.FC<ImageProps> = ({path, className})=>{
    return (
        <div className={ImageStyle["container"]}>
            <img src={path} alt="image" className={`${ImageStyle["image"]} ${className}`}/>
        </div>
    );
}