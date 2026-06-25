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

    const sortByMostRecent = ()=>{
        if(activeBookmarkType==="question"){
            setQuestions((prev)=>{
                return [...prev].sort((a, b)=>{
                    return new Date(b.askedAt).getTime() - new Date(a.askedAt).getTime();
                });
            });
        }else{
            setAnswers((prev)=>{
                return [...prev].sort((a, b)=>{
                    return new Date(b.askedAt??Date.now()).getTime() - new Date(a.askedAt??Date.now()).getTime();
                });
            });
        }
    }

    const sortByMostUpvotes = ()=>{
        if(activeBookmarkType==="question"){
            setQuestions((prev)=>{
                return [...prev].sort((a, b)=>{
                    return b.voteCount - a.voteCount;
                });
            });
        }else{
            setAnswers((prev)=>{
            return [...prev].sort((a, b)=>{
                    return (b.voteCount??0) - (a.voteCount??0);
                });
            })
        }
    }

    const options = [
        {
            title: "Most Recent",
            function: sortByMostRecent,
        },
        {
            title: "Most Upvotes",
            function: sortByMostUpvotes,
        },
    ];

    return (
        <div className={BookmarksStyle["container"]}>
            <div className={BookmarksStyle["title"]}>
                <span>Your Bookmarks</span>
            </div>
            <div className={BookmarksStyle["bookmark-type"]}>
                <RoundedButton text="Questions" active={activeBookmarkType==="question"} onClick={()=>setActiveBookmarkType("question")}/>
                <RoundedButton text="Answers" active={activeBookmarkType==="answer"} onClick={()=>setActiveBookmarkType("answer")}/>
            </div>
            <FilterBar options={options}/>
            <div className={BookmarksStyle["result-count"]}>
                {
                    (activeBookmarkType==="question")
                    &&
                    !(questions.length===0)
                    &&
                    <span>
                        <span className={BookmarksStyle["bold-text"]}>
                            {
                                `${questions.length}`
                            }
                        </span>
                         question found
                    </span>
                }
                {
                    (activeBookmarkType==="answer")
                    &&
                    !(answers.length===0)
                    &&
                    <span>
                        <span className={BookmarksStyle["bold-text"]}>
                            {
                                `${answers.length}`
                            }
                        </span>
                         answers found
                    </span>
                }
            </div>
            <div className={BookmarksStyle["result-container"]}>
                {
                    activeBookmarkType==="question" && 
                    (
                        <div className={BookmarksStyle["questions-container"]}>
                            {
                                questions.length===0
                                &&
                                <p className={BookmarksStyle["label"]}>
                                    No Questions are bookmarked yet.
                                </p>
                            }
                            {
                                questions.map((question)=>{
                                    return <Question key={question._id} question={question} level1Comments={true}/>
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
                                    return <UserAnswerTile key={answer._id} answer={answer} level1={true}/>
                                })
                            }
                        </div>
                    )
                }
            </div>
        </div>
    );
}