import {io, Socket} from "socket.io-client";

let socket: Socket;

export const createSocket = ()=>{
    socket = io(import.meta.env.VITE_BACKEND_URL, {
        withCredentials: true,
    });
    return socket;
}

export const getSocket = ()=>socket;