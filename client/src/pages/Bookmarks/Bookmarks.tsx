import { useEffect, useState } from "react";
import BookmarksStyle from "./Bookmarks.module.css";
import { RoundedButton } from "../../components/common/RoundedButton/RoundedButton";
import { FilterBar } from "../../components/layout/FilterBar/FilterBar";
import { UserAnswerTile } from "../../components/common/UserAnswerTile/UserAnswerTile";
import type { AnswerInterface } from "../../types/ApiResponse/answer.type";
import type { QuestionInterface } from "../../types/ApiResponse/question.type";
import { Question } from "../../components/common/Question/Question";
import { useBookmarksHandler } from "./Bookmarks.handler";

export const Bookmarks = ()=>{
    const [activeBookmarkType, setActiveBookmarkType] = useState<"question" | "answer">("question");

    const [answers, setAnswers] = useState<Partial<AnswerInterface>[]>([]);
    const [questions, setQuestions] = useState<QuestionInterface[]>([]);

    const {
        fetchBookmarkedQuestions,
        fetchBookmarkedAnswers,
    } = useBookmarksHandler(setQuestions, setAnswers);

    useEffect(()=>{
        fetchBookmarkedQuestions();
    }, []);

    useEffect(()=>{
        if(activeBookmarkType==="answer"){
            fetchBookmarkedAnswers();
        }else fetchBookmarkedQuestions();
    }, [activeBookmarkType]);

    return (
        <div className={BookmarksStyle["container"]}>
            <div className={BookmarksStyle["title"]}>
                <span>Your Bookmarks</span>
            </div>
            <div className={BookmarksStyle["bookmark-type"]}>
                <RoundedButton text="Questions" active={activeBookmarkType==="question"} onClick={()=>setActiveBookmarkType("question")}/>
                <RoundedButton text="Answers" active={activeBookmarkType==="answer"} onClick={()=>setActiveBookmarkType("answer")}/>
            </div>
            <FilterBar/>
            <div className={BookmarksStyle["result-count"]}>
                928 results found
            </div>
            <div className={BookmarksStyle["result-container"]}>
                {
                    activeBookmarkType==="question" && 
                    (
                        <div className={BookmarksStyle["questions-container"]}>
                            Your bookmarked questions
                            {
                                questions.map((question)=>{
                                    return <Question key={question._id} question={question}/>
                                })
                            }
                        </div>
                    )
                }
                {
                    activeBookmarkType==="answer" &&
                    (
                        <div className={BookmarksStyle["answers-container"]}>
                            {
                                answers.map(answer=>{
                                    return <UserAnswerTile answer={answer}/>
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}