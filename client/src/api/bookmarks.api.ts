import type { BookmarkPayload } from "../types/ApiRequest/bookmarks.type";
import api from "./axios";

export const addBookmarkAPI = (data : any)=>{
    return api.post("/bookmarks/add", data);
}

export const removeBookmarkAPI = (data: any)=>{
    return api.post("/bookmarks/remove", data);
}

export const isBookmarkedAPI = (data: BookmarkPayload)=>{
    return api.post("/bookmarks/check", data);
}

export const fetchBookmarkedAnswersAPI = ()=>{
    return api.get("/bookmarks/answers");
}

export const fetchBookmarkedQuestionsAPI = ()=>{
    return api.get("/bookmarks/questions");
}