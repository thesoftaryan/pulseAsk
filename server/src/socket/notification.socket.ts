import { Server } from "socket.io";
import { getUserSocket } from ".";
import { io } from "../server";

export const emitSocketNotification = (
    uid: string,
    notification: any,
)=>{
    const socketId = getUserSocket(uid);
    if(socketId){
        io.to(socketId).emit(
            "notification:new",
            notification,
        );
    }
}