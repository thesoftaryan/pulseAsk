import {io, Socket} from "socket.io-client";

let socket: Socket;

export const connectSocket = (userId: string)=>{
    socket = io(import.meta.env.VITE_BACKEND_URL, {
        withCredentials: true,
    });

    socket.on("connect", ()=>{
        console.log("Connected to socket: ", socket.id);
        socket.emit("register", userId);
    });

    return socket;
}

export const getSocket = ()=>socket;