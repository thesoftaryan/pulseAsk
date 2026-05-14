import SearchStyle from "./Search.module.css";
import { useSearchParams } from "react-router-dom";
import { FilterBar } from "../../components/layout/FilterBar/FilterBar";
import { useEffect, useState } from "react";
import { useSafeNavigate } from "../../hooks/useSafeNavigate.hook";
import { homeRoutes } from "../../routes/routesConstants";
import { RoundedButton } from "../../components/common/RoundedButton/RoundedButton";
// import { Question } from "../../components/common/Question/Question";
import { SearchProfileTile } from "./SearchProfileTile/SearchProfileTile";
import { useSearchHandler } from "./Search.handler";
import { Question } from "../../components/common/Question/Question";

export type SearchType = "question"|"people";

export const Search = ()=>{
    const [serachParams] = useSearchParams();
    let query = serachParams.get("query")??"";
    const {safeNavigate} = useSafeNavigate();
    const [activeSearchType, setActiveSearchType] = useState<SearchType>("question");
    
    const [questions, setQuestions]=useState<any[]>([]);
    const [people, setPeople]=useState<any[]>([]);

    const {
        fetchQAResultsHandler,
        fetchPeopleResultsHandler,
    } = useSearchHandler(
        setQuestions,
        setPeople,
    );

    useEffect(()=>{
        if(!query || (query.trim()==="")){
            safeNavigate(homeRoutes.home);
        }
        fetchQAResultsHandler(query);
    }, []);

    useEffect(()=>{
        if(activeSearchType==="question"){
            fetchQAResultsHandler(query);
        }else{
            fetchPeopleResultsHandler(query);
        }
    }, [activeSearchType, query]);




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
            {
                activeSearchType==="people"
                &&
                people.length!==0
                &&
                <FilterBar/>
            }
            {
                activeSearchType==="question"
                &&
                questions.length!==0
                &&
                <FilterBar/>
            }
            <div className={SearchStyle["result-count"]}>
                {
                    activeSearchType==="people"
                    &&
                    people.length!==0 
                    &&
                    <div>
                        <span className={SearchStyle["count-text"]}>
                        {people.length}
                    </span>
                    <span>
                        {`persons found`}
                    </span>
                    </div>
                }
                {
                    activeSearchType==="people"
                    &&
                    people.length===0 
                    &&
                    <p  className={SearchStyle["label"]}> No person found </p>
                }
                {
                    activeSearchType==="question"
                    &&
                    questions.length!==0 
                    &&
                    <div>
                        <span className={SearchStyle["count-text"]}>
                        {questions.length}
                    </span>
                    <span>
                        {`questions found`}
                    </span>
                    </div>
                }
                {
                    activeSearchType==="question"
                    &&
                    questions.length===0 
                    &&
                    <p  className={SearchStyle["label"]}> No question found </p>
                }
            </div>
            <div className={SearchStyle["result-container"]}>
                {
                    activeSearchType==="question" && 
                    (
                        <div className={SearchStyle["questions-container"]}>
                            {
                                questions?.map((question)=>{
                                    return <Question key={question._id} question={question}/>
                                })
                            }
                        </div>
                    )
                }
                {
                    activeSearchType==="people" &&
                    (
                        <div className={SearchStyle["profiles-container"]}>
                            {
                                people?.map((person)=>{
                                    return <SearchProfileTile key={person._id} profile={person}/>
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}