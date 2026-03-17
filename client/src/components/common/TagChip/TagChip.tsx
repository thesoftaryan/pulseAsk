
import TagChipStyle from "./TagChip.module.css";

import CloseIcon from "../../../assets/icons/general/close.svg?react";

interface TagChipProps{
    color : string;
    text : string;
    level1? : boolean;
    isLarge?: boolean;
    onDelete?: ()=>void;
    key?: string;
}

export const TagChip : React.FC<TagChipProps> = ({color, text, level1, isLarge, onDelete, key})=>{
    return (
        <>
            <div key={key} className={`${TagChipStyle["container"]} ${(level1)? TagChipStyle["level1"]:""} ${(isLarge)? TagChipStyle["large-container"]:""}`}>
                <div className={TagChipStyle["left"]}>
                    <div style={{backgroundColor: color}} className={`${TagChipStyle["circle"]} ${(isLarge)? TagChipStyle["large-circle"]:""}`} ></div>
                </div>
                <div className={`${TagChipStyle["right"]} ${(isLarge)? TagChipStyle["large"]:""}`}>
                    {text}
                </div>
                {
                    onDelete && (
                        <div onClick={onDelete} className={TagChipStyle["delete-container"]}>
                            <CloseIcon className={TagChipStyle["close-icon"]}/>
                        </div>
                    )
                }
            </div>

        </>
    );
}