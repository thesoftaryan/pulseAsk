import RoundedButton from "../../common/RoundedButton/RoundedButton";

import SortIcon from "../../../assets/icons/general/sort.svg?react";
import FilterIcon from "../../../assets/icons/general/filter.svg?react";

import FilterBarStyle from "./FilterBar.module.css"

interface FilterBarProps{
    text?: string;
    reverse?: boolean;
}

export const FilterBar : React.FC<FilterBarProps> = ({text, reverse})=>{
    return (
        <>
        <div className={`${FilterBarStyle["container"]} ${reverse? FilterBarStyle["reverse"]:""}`}>
            <div className={FilterBarStyle["buttons"]}>
                <RoundedButton Icon={SortIcon} text="Sort By"/>
                <RoundedButton Icon={FilterIcon} active={true} text="Filters"/>
            </div>
            <div className={FilterBarStyle["line"]}></div>
            {text && (
                <div className={FilterBarStyle["text"]}>{text}</div>
            )}
        </div>
        </>
    );
}