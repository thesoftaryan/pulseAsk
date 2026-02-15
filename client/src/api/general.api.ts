import api from "./axios";

export const uploadImageAPI = ( data : FormData )=>{
    return api.post("/upload/image", data);
}