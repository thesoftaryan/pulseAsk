import { Server } from "socket.io";
import { getUserSocket } from ".";
import { io } from "../server";

export const emitSocketNotification = (
    uid: string,
    notification: any,
    type: string = "system",
)=>{
    // console.log("calling getUserSocket");
    const socketId = getUserSocket(uid);
    // console.log(socketId, uid, notification);
    if(socketId){
        io.to(socketId).emit(
            "notification:new",
            notification,
        );
    }
}