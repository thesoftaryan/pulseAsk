import SearchBarStyle from "./SearchBar.module.css";

import SearchIcon from "../../../assets/icons/header/search.svg?react";
import { useState, type Dispatch, type SetStateAction } from "react";

interface SearchBarProps{
    placeholder? : string;
    level1?: boolean;
    setSearchText: Dispatch<SetStateAction<string>>;
    onSubmit?: ()=>void;
    collapse?: boolean;
}

export const SearchBar:React.FC<SearchBarProps> = ({placeholder, level1, setSearchText, onSubmit, collapse=true})=>{
    const [currInput, setCurrInput] = useState("");
    const handleSubmit = ()=>{
        if(currInput.trim() && onSubmit){
            onSubmit();
        }
    }
    return (
        <div className={`${SearchBarStyle["search-box"]} ${SearchBarStyle[level1?"level1":""]}`}>
            {/* <div className={`${SearchBarStyle[collapse?"collapse":"no-collapse"]}`}> */}
                <input onChange={(e)=>{setSearchText(e.target.value); setCurrInput(e.target.value);}} onKeyDown={(e)=>{if(e.key==="Enter") handleSubmit();}} type="text" placeholder={placeholder??"Search for questions, answer, persons..."} className={`${SearchBarStyle[collapse?"collapse":"no-collapse"]} ${SearchBarStyle["search-input"]} ${SearchBarStyle[level1?"level1":""]}`}/>
            {/* </div> */}
            {
                onSubmit
                &&
                <div onClick={handleSubmit} className={SearchBarStyle["search-icon-container"]}>
                    <SearchIcon className={SearchBarStyle["search-icon"]}/>
                </div>
            }
        </div>
    );
};