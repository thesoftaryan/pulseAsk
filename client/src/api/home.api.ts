import api from "./axios";

export const getHomeMessageAPI = ()=>{
    return api.get("/home/");
}