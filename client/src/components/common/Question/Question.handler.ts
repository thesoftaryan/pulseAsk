import type { SetStateAction } from "react";
import { useBookmark } from "../../../hooks/bookmark.hook"
import type { BookmarkPayload } from "../../../types/ApiRequest/bookmarks.type";

export const useQuestionHandler = (
    setBookmarked : React.Dispatch<SetStateAction<boolean>>,
)=>{
    const {isBookmarked, toggleBookmark} = useBookmark();
    const isBookmarkedHandler = async (targetId: string)=>{
        const data:BookmarkPayload = {
            type: "question",
            targetId,
        }
        const bookmarked = (await isBookmarked(data))??false;
        setBookmarked(bookmarked);
    }
    const toggleBookmarkHandler = async (targetId: string, bookmark: boolean)=>{
        const data:BookmarkPayload = {
            type: "question",
            targetId,
        }
        const bookmarkValue = (await toggleBookmark(data, bookmark));
        setBookmarked(bookmarkValue);
    }

    return {
        isBookmarkedHandler,
        toggleBookmarkHandler,
    }
}