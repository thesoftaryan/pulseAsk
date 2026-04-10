import { useEffect, useRef } from "react";
import { createSocket, getSocket } from "../services/socket.service"
import type { Socket } from "socket.io-client";

export const useSocket = (userId?: string)=>{
    const socketRef = useRef<Socket | null>(null);
    
    useEffect(()=>{
        if(!userId) return;
        let socket = getSocket();
        if(!socket){
            socket = createSocket();
        }
        socketRef.current = socket;
    
        socket.on("connect", ()=>{
            console.log("Connected to socket: ", socket.id);
            socket.emit("register", userId);
        });
        return ()=>{
            socket.off("connect");
        }
    }, [userId]);

    return socketRef.current;
}