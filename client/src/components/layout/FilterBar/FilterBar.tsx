import RoundedButton from "../../common/RoundedButton/RoundedButton";

import SortIcon from "../../../assets/icons/general/sort.svg?react";
import FilterIcon from "../../../assets/icons/general/filter.svg?react";

import FilterBarStyle from "./FilterBar.module.css"

export const FilterBar = ()=>{
    return (
        <>
        <div className={FilterBarStyle["container"]}>
            <div className={FilterBarStyle["buttons"]}>
                <RoundedButton Icon={SortIcon} text="Sort By"/>
                <RoundedButton Icon={FilterIcon} active={true} text="Filters"/>
            </div>
            <div className={FilterBarStyle["line"]}></div>
        </div>
        </>
    );
}