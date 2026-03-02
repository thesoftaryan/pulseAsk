import SearchStyle from "./Search.module.css";
import { useSearchParams } from "react-router-dom";
import { FilterBar } from "../../components/layout/FilterBar/FilterBar";
import { useEffect } from "react";
import { useSafeNavigate } from "../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../routes/routesConstants";

export const Search = ()=>{
    const [serachParams, setSearchParams] = useSearchParams();

    const {safeNavigate} = useSafeNavigate();

    useEffect(()=>{
        if(!serachParams.get("query")){
            safeNavigate(homeRoutes.home);
        }
    }, []);
    return (
        <div className="container">
            <div className="title">
                Results for {serachParams.get("query")??""}
            </div>
            <div className="result-type"></div>
            <FilterBar/>
            <div className="results-count"></div>
            <div className="result-container"></div>
        </div>
    );
}