import { addBookmarkAPI, fetchBookmarkedAnswersAPI, fetchBookmarkedQuestionsAPI, isBookmarkedAPI, removeBookmarkAPI } from "../api/bookmarks.api"
import type { BookmarkPayload } from "../types/ApiRequest/bookmarks.type";

export const addBookmarkService = (data : BookmarkPayload)=>{
    return addBookmarkAPI(data);
}

export const removeBookmarkService = (data:BookmarkPayload)=>{
    return removeBookmarkAPI(data);
}

export const isBookmarkedService = (data : BookmarkPayload)=>{
    return isBookmarkedAPI(data);
}

export const fetchBookmarkedAnswersService = ()=>{
    return fetchBookmarkedAnswersAPI();
}

export const fetchBookmarkedQuestionsService = ()=>{
    return fetchBookmarkedQuestionsAPI();
}