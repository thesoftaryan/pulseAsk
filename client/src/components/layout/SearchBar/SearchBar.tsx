import SearchBarStyle from "./SearchBar.module.css";

import SearchIcon from "../../../assets/icons/header/search.svg?react";
import { useState, type Dispatch, type SetStateAction } from "react";

interface SearchBarProps{
    placeholder? : string;
    level1?: boolean;
    setSearchText: Dispatch<SetStateAction<string>>;
    onSubmit?: ()=>void;
}

export const SearchBar:React.FC<SearchBarProps> = ({placeholder, level1, setSearchText, onSubmit})=>{
    const [currInput, setCurrInput] = useState("");
    return (
        <div className={`${SearchBarStyle["search-box"]} ${SearchBarStyle[level1?"level1":""]}`}>
            <input onChange={(e)=>{setSearchText(e.target.value); setCurrInput(e.target.value);}} type="text" placeholder={placeholder??"Search for questions, answer, persons..."} className={`${SearchBarStyle["search-input"]} ${SearchBarStyle[level1?"level1":""]}`}/>
            <div onClick={(currInput)? onSubmit:undefined} className={SearchBarStyle["search-icon-container"]}>
                <SearchIcon className={SearchBarStyle["search-icon"]}/>
            </div>
        </div>
    );
}