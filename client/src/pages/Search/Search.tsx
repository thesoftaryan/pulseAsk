import SearchStyle from "./Search.module.css";
import { useSearchParams } from "react-router-dom";
import { FilterBar } from "../../components/layout/FilterBar/FilterBar";
import { useEffect, useState } from "react";
import { useSafeNavigate } from "../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../routes/routesConstants";
import { RoundedButton } from "../../components/common/RoundedButton/RoundedButton";
// import { Question } from "../../components/common/Question/Question";
import { SearchProfileTile } from "./SearchProfileTile/SearchProfileTile";

export type SearchType = "question"|"people";

export const Search = ()=>{
    const [serachParams] = useSearchParams();

    const {safeNavigate} = useSafeNavigate();
    const [activeSearchType, setActiveSearchType] = useState<SearchType>("question");

    useEffect(()=>{
        if(!serachParams.get("query") || (serachParams.get("query")?.trim()==="")){
            safeNavigate(homeRoutes.home);
        }
    }, []);



    return (
        <div className={SearchStyle["container"]}>
            <div className={SearchStyle["title"]}>
                <span>Results for </span>
                <span className={SearchStyle["search-text"]}>
                    {serachParams.get("query")??""}
                </span>
            </div>
            <div className={SearchStyle["result-type"]}>
                <RoundedButton text="Questions" active={activeSearchType==="question"} onClick={()=>setActiveSearchType("question")}/>
                <RoundedButton text="People" active={activeSearchType==="people"} onClick={()=>setActiveSearchType("people")}/>
            </div>
            <FilterBar/>
            <div className={SearchStyle["result-count"]}>
                928 results found
            </div>
            <div className={SearchStyle["result-container"]}>
                {
                    activeSearchType==="question" && 
                    (
                        <div className={SearchStyle["questions-container"]}>
                            {/* <Question title="How to do CPR"/>
                            <Question title="How to do CPR"/>
                            <Question title="How to do CPR"/>
                            <Question title="How to do CPR"/> */}
                        </div>
                    )
                }
                {
                    activeSearchType==="people" &&
                    (
                        <div className={SearchStyle["profiles-container"]}>
                            <SearchProfileTile/>
                            <SearchProfileTile/>
                            <SearchProfileTile/>
                            <SearchProfileTile/>
                            <SearchProfileTile/>
                        </div>
                    )
                }
            </div>
        </div>
    );
}