
import TagChipStyle from "./TagChip.module.css";

interface TagChipProps{
    color : string;
    text : string;
}

export const TagChip : React.FC<TagChipProps> = ({color, text})=>{
    return (
        <>
            <div className={TagChipStyle["container"]}>
                <div className={TagChipStyle["left"]}>
                    <div style={{backgroundColor: color}} className={TagChipStyle["circle"]} ></div>
                </div>
                <div className={TagChipStyle["right"]}>
                    {text}
                </div>
            </div>
        </>
    );
}