import SearchBarStyle from "./SearchBar.module.css";

import SearchIcon from "../../../assets/icons/header/search.svg?react";

interface SearchBarProps{
    placeholder? : string;
    level1?: boolean;
}

export const SearchBar:React.FC<SearchBarProps> = ({placeholder, level1})=>{
    return (
        <div className={`${SearchBarStyle["search-box"]} ${SearchBarStyle[level1?"level1":""]}`}>
            <input type="text" placeholder={placeholder??"Search for questions, answer, persons..."} className={`${SearchBarStyle["search-input"]} ${SearchBarStyle[level1?"level1":""]}`}>
                
            </input>
            <div className={SearchBarStyle["search-icon-container"]}>
                <SearchIcon className={SearchBarStyle["search-icon"]}/>
            </div>
        </div>
    );
}