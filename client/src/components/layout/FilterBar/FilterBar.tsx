import RoundedButton from "../../common/RoundedButton/RoundedButton";

import SortIcon from "../../../assets/icons/general/sort.svg?react";
import FilterIcon from "../../../assets/icons/general/filter.svg?react";

import FilterBarStyle from "./FilterBar.module.css"

interface FilterBarProps{
    text?: string;
    reverse?: boolean;
    level2? : boolean;
    noFilter?: boolean;
}

export const FilterBar : React.FC<FilterBarProps> = ({text, reverse, level2, noFilter})=>{
    return (
        <>
        <div className={`${FilterBarStyle["container"]} ${reverse? FilterBarStyle["reverse"]:""}`}>
            <div className={FilterBarStyle["buttons"]}>
                <RoundedButton level2={level2} Icon={SortIcon} text="Sort By"/>
                {!noFilter && <RoundedButton Icon={FilterIcon} active={true} text="Filters"/>}
            </div>
            <div className={FilterBarStyle["line"]}></div>
            {text && (
                <div className={FilterBarStyle["text"]}>{text}</div>
            )}
        </div>
        </>
    );
}