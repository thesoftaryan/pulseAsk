
import TagChipStyle from "./TagChip.module.css";

import CloseIcon from "../../../assets/icons/general/close.svg?react";
import { useSafeNavigate } from "../../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../../routes/routesConstants";
// import { Spinner } from "../Spinner/Spinner";

interface TagChipProps{
    color : string;
    text : string;
    slug?: string;
    level1? : boolean;
    isLarge?: boolean;
    onDelete?: ()=>void;
    loading?: boolean;
    Key?: string;
}

export const TagChip : React.FC<TagChipProps> = ({color, text, slug, level1, isLarge, onDelete, loading, Key})=>{
    const {safeNavigate} = useSafeNavigate();
    return (
        <>
            <div onClick={()=>{if(slug) safeNavigate(homeRoutes.tag+`/${slug}`)}} key={Key} className={`${TagChipStyle["container"]} ${(level1)? TagChipStyle["level1"]:""} ${(isLarge)? TagChipStyle["large-container"]:""}`}>
                <div className={TagChipStyle["left"]}>
                    <div style={{backgroundColor: color}} className={`${TagChipStyle["circle"]} ${(isLarge)? TagChipStyle["large-circle"]:""}`} ></div>
                </div>
                <div className={`${TagChipStyle["right"]} ${(isLarge)? TagChipStyle["large"]:""}`}>
                    {text}
                </div>
                {
                    onDelete && (
                        <div onClick={loading? undefined:onDelete} className={TagChipStyle["delete-container"]}>
                            <CloseIcon className={TagChipStyle["close-icon"]}/>
                            {/* {
                                loading?
                                <div className={TagChipStyle["spinner"]}><Spinner small={true}/></div>
                                :
                                <CloseIcon className={TagChipStyle["close-icon"]}/>
                            } */}
                                
                        </div>
                    )
                }
            </div>

        </>
    );
}