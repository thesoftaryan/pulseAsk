import { useBookmark } from "../../hooks/bookmark.hook";
import type { AnswerInterface } from "../../types/ApiResponse/answer.type";
import type { QuestionInterface } from "../../types/ApiResponse/question.type";

export const useBookmarksHandler = (
    setQuestions : React.Dispatch<React.SetStateAction<QuestionInterface[]>>,
    setAnswers : React.Dispatch<React.SetStateAction<Partial<AnswerInterface>[]>>,
)=>{
    const {fetchBookmarked} = useBookmark();

    const fetchBookmarkedQuestions = async ()=>{
        const questions = (await fetchBookmarked("question"))as QuestionInterface[];
        setQuestions(questions);
    }

    const fetchBookmarkedAnswers = async ()=>{
        const answers = (await fetchBookmarked("answer"))as Partial<AnswerInterface>[];
        setAnswers(answers);
    }

    return {
        fetchBookmarkedQuestions,
        fetchBookmarkedAnswers,
    }
}