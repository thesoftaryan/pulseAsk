import { useEffect } from "react";
import type { Theme } from "../types/redux/theme.redux.types";
import { useAppSelector } from "./store.hooks";


const applyTheme = (theme : Theme)=>{
    if(theme==="dark"){
        document.documentElement.setAttribute("data-theme", "dark");
    }else{
        document.documentElement.removeAttribute("data-theme");
    }
}

export const useApplyTheme = ()=>{

    const theme = useAppSelector(state => state.theme.theme);

    useEffect(()=>{
        applyTheme(theme);
        localStorage.setItem("theme", theme);
    },[theme]);
}