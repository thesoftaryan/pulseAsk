// Axios is nothing more than an HTTP client for the browser and node.js, based on Promises.
import axios from "axios";

// Creating api client for code reusability
const api = axios.create({
    baseURL: "http://localhost:5000",
    withCredentials : true,
    headers: {
        "Content-Type" : "application/json",
    }
});

export default api;