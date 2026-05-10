import { useState } from "react";
import BookmarksStyle from "./Bookmarks.module.css";
import { RoundedButton } from "../../components/common/RoundedButton/RoundedButton";
import { FilterBar } from "../../components/layout/FilterBar/FilterBar";

export const Bookmarks = ()=>{
    const [activeBookmarkType, setActiveBookmarkType] = useState<"Question" | "Answer">("Question");
    return (
        <div className={BookmarksStyle["container"]}>
            <div className={BookmarksStyle["title"]}>
                <span>Your Bookmarks</span>
            </div>
            <div className={BookmarksStyle["bookmark-type"]}>
                <RoundedButton text="Questions" active={activeBookmarkType==="Question"} onClick={()=>setActiveBookmarkType("Question")}/>
                <RoundedButton text="Answers" active={activeBookmarkType==="Answer"} onClick={()=>setActiveBookmarkType("Answer")}/>
            </div>
            <FilterBar/>
            <div className={BookmarksStyle["result-count"]}>
                928 results found
            </div>
            <div className={BookmarksStyle["result-container"]}>
                {
                    activeBookmarkType==="Question" && 
                    (
                        <div className={BookmarksStyle["questions-container"]}>
                            Your bookmarked questions
                            {/* <Question title="How to do CPR"/>
                            <Question title="How to do CPR"/>
                            <Question title="How to do CPR"/>
                            <Question title="How to do CPR"/> */}
                        </div>
                    )
                }
                {
                    activeBookmarkType==="Answer" &&
                    (
                        <div className={BookmarksStyle["profiles-container"]}>
                            Your bookmarked Answers
                        </div>
                    )
                }
            </div>
        </div>
    );
}