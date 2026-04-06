/*
It will contain all the socket related components
of chat system of the app
*/

import { Server, Socket } from "socket.io";
import { ChatMessage } from "../models/ChatMessage.model";
import { createChatMessageService } from "../services/chat.service";

const onlineUsers = new Map<string, string>();

export const registerChatSocket = (io:Server)=>{
    io.on("connection", (socket: Socket)=>{
        // console.log("User connected at socket: ", socket.id);
        
        socket.on("register", (userId : string) => {
            onlineUsers.set(userId, socket.id);
        });

        socket.on("send_message", async (data)=>{
            const {senderId, receiverId, content} = data;
            
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
                socket.emit("message_sent", message);
            }
        });

        socket.on("disconnect", ()=>{
            // console.log("User disconnected from socket: ", socket.id);

            for(const [userId, socketId] of onlineUsers.entries()){
                if(socketId == socket.id){
                    onlineUsers.delete(userId);break;
                }
            }
        })

    })
}
