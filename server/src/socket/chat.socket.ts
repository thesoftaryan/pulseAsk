/*
It will contain all the socket related components
of chat system of the app
*/

import { Server, Socket } from "socket.io";
import { createChatMessageService, updateUserStatus } from "../services/chat.service";
import { Types } from "mongoose";

const onlineUsers = new Map<string, string>();

export const registerChatSocket = (io:Server)=>{
    io.on("connection", (socket: Socket)=>{
        console.log("User connected at socket: ", socket.id);
        
        socket.on("register", async (userId : string) => {
            // console.log("user : ",userId, " is getting registered");
            onlineUsers.set(userId, socket.id);
            await updateUserStatus(userId, "online");
            socket.broadcast.emit("user_status", {userId, status:"online"});
        });

        socket.on("send_message", async (data)=>{
            const {senderId, receiverId, content} = data;
            // console.log("user: ",senderId, ", has sent a message (", content,") to : ", receiverId);
            
            //* We also need to verify that the senderId is mapped to this socket

            // real message part
            const message = await createChatMessageService(data);

            //test message part
            // const message = {
            //     senderId: senderId,
            //     content: content,
            //     sentAt: new Date(),
            // }

            // Now checking if the receiver is online and sending the message to his socket
            const receiverSocket = onlineUsers.get(receiverId);

            if(receiverSocket){
                io.to(receiverSocket).emit("receive_message", message);
            }
            socket.emit("message_sent", message);
        });


        socket.on("disconnect", async ()=>{
            console.log("User disconnected from socket: ", socket.id);
            let disconnectedUserId;
            for(const [userId, socketId] of onlineUsers.entries()){
                if(socketId == socket.id){
                    disconnectedUserId = userId;
                    onlineUsers.delete(userId);break;
                }
            }
            if(disconnectedUserId){
                await updateUserStatus(disconnectedUserId, "offline");
                socket.broadcast.emit("user_status", {userId:disconnectedUserId, status:"offline"});
            }
        })

    })
}
