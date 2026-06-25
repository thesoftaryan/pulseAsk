import {RoundedButton} from "../../common/RoundedButton/RoundedButton";

import SortIcon from "../../../assets/icons/general/sort.svg?react";
import FilterIcon from "../../../assets/icons/general/filter.svg?react";

import FilterBarStyle from "./FilterBar.module.css"
import { useState } from "react";

interface FilterBarProps{
    text?: string;
    reverse?: boolean;
    level2? : boolean;
    noFilter?: boolean;
    noSort?: boolean;
    options?:any[];
}

export const FilterBar : React.FC<FilterBarProps> = ({text, reverse, level2, noFilter, noSort, options})=>{
    const [optionModal, setOptionModal] = useState(false);
    
    return (
        <>
        <div className={`${FilterBarStyle["container"]} ${reverse? FilterBarStyle["reverse"]:""}`}>
            <div className={FilterBarStyle["buttons"]}>
                {
                    !noSort
                    &&
                    <RoundedButton onClick={()=>setOptionModal((prev)=>!prev)} level2={level2} Icon={SortIcon} text="Sort By"/>
                }
                {
                    optionModal
                    &&
                    <div className={FilterBarStyle["option-modal"]}>
                        <div className={FilterBarStyle["options"]}>
                            {
                                options?.map((option)=>{
                                    return <div key={option.title} onClick={()=>{option.function(); setOptionModal((prev)=>!prev)}} className={FilterBarStyle["option"]}>
                                        <p>{option.title}</p>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                }
                {/* Planning to implement it in next phase */}
                {noFilter && !noFilter && <RoundedButton Icon={FilterIcon} active={true} text="Filters"/>}
            </div>
            <div className={FilterBarStyle["line"]}></div>
            {text && (
                <div className={FilterBarStyle["text"]}>{text}</div>
            )}
        </div>
        </>
    );
}