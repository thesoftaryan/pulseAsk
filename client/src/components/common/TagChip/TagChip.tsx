
import TagChipStyle from "./TagChip.module.css";

interface TagChipProps{
    color : string;
    text : string;
    level1? : boolean;
}

export const TagChip : React.FC<TagChipProps> = ({color, text, level1})=>{
    return (
        <>
            <div className={`${TagChipStyle["container"]} ${(level1)? TagChipStyle["level1"]:""}`}>
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