import { addBookmarkAPI, fetchBookmarkedAnswersAPI, fetchBookmarkedQuestionsAPI, isBookmarkedAPI, removeBookmarkAPI } from "../api/bookmarks.api"

export const addBookmarkService = (data : any)=>{
    return addBookmarkAPI(data);
}

export const removeBookmarkService = (data:any)=>{
    return removeBookmarkAPI(data);
}

export const isBookmarkedService = (data : any)=>{
    return isBookmarkedAPI(data);
}

export const fetchBookmarkedAnswersService = ()=>{
    return fetchBookmarkedAnswersAPI();
}

export const fetchBookmarkedQuestionsService = ()=>{
    return fetchBookmarkedQuestionsAPI();
}