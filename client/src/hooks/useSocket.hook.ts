import { useEffect, useRef } from "react";
import { createSocket, getSocket } from "../services/socket.service"
import type { Socket } from "socket.io-client";
import { useAppSelector } from "./store.hook";

export const useSocket = ()=>{
    const socketRef = useRef<Socket | null>(null);
    
    const user = useAppSelector(state=>state.auth.user);

    useEffect(()=>{
        let socket = getSocket();
        if(!user?._id) {
            if(socket){
                socket.disconnect();
            }
            return;
        }
        if(!socket){
            socket = createSocket();
        }

        if(!socket.connected){
            socket.on("connect", ()=>{
                // console.log("Connected to socket: ", socket.id);
                socket.emit("register", user._id);
            });
        }

        socketRef.current = socket;
    
        return ()=>{
            socket.off("connect");
        }
    }, [user?._id]);

    return socketRef.current;
}