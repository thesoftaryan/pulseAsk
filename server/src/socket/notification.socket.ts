import { Server } from "socket.io";
import { getUserSocket } from ".";
import { io } from "../server";
import { Types } from "mongoose";

export const emitSocketNotification = (
    uid: Types.ObjectId,
    notification: any,
    type: string = "system",
)=>{
    // console.log("calling getUserSocket");
    const socketId = getUserSocket(uid.toString());
    // console.log(socketId, uid, notification);
    if(socketId){
        io.to(socketId).emit(
            "notification:new",
            notification,
        );
    }
}