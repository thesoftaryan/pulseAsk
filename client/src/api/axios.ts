// Axios is nothing more than an HTTP client for the browser and node.js, based on Promises.
import axios, { AxiosError, type AxiosResponse } from "axios";

// import { useAppDispatch } from "../hooks/store.hooks";
// import { logoutThunk } from "../store/auth/thunks/logout.thunk";

// Creating api client for code reusability
const api = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials : true,
});

const refreshAPI = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials : true,
});

let refreshPromise : Promise<void> | null = null;

api.interceptors.response.use(
    (response : AxiosResponse)=>response,
    async (error : AxiosError)=>{
        const originalRequest = error.config as any;

        if(error.response?.status !== 401 || originalRequest?._retried){
            return Promise.reject(error);
        }

        // console.log("interceptor is being used to get the access token")
        originalRequest._retried = true;

        try{
            if(!refreshPromise){
                refreshPromise = refreshAPI.post("/auth/refresh-token");
            }
            // console.log("waiting for refreshPromise to resolve");
            await refreshPromise;
            // console.log("refreshPromise resolved, making retry");
            return api(originalRequest);
        }catch(err){
            // console.log("Dispatching auth/logout");
            document.dispatchEvent(new Event("auth/logout"));
            return Promise.reject(err);
        }finally{
            // console.log("resetting refreshPromise");
            refreshPromise = null;
        }

    }
)

export default api;