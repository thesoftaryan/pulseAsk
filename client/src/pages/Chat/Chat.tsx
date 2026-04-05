import { SearchBar } from "../../components/layout/SearchBar/SearchBar";
import ChatStyle from "./Chat.module.css";
import { PersonTile } from "./PersonTile/PersonTile";


import UserImage from "../../assets/images/user.png";

import SendIcon from "../../assets/icons/general/send.svg?react";
import AttachmentIcon from "../../assets/icons/general/attachment.svg?react";
import BanIcon from "../../assets/icons/general/ban.svg?react";
import SearchIcon from "../../assets/icons/header/search.svg?react";
import ReportUserIcon from "../../assets/icons/general/report_user.svg?react";
import { MessageTile } from "./MessageTile/MessageTile";
import { TimelineTile } from "./TimelineTile/TimelineTile";
import { useEffect, useState } from "react";

// Socket io
import { connectSocket, getSocket } from "../../services/socket.service";
import { useAppSelector } from "../../hooks/store.hook";

interface chatInterface{
    senderId: string,
    content: string,
}

export const Chat = ()=>{

    const [chats, setChats] = useState<chatInterface[]>([]);
    
    const user = useAppSelector(state=>state.auth.user);
    useEffect(()=>{
        console.log(user?._id);
        const socket = connectSocket(user?._id!);
        socket.on("receive_message", (message)=>{
            console.log("setting chats")
            setChats((chats)=>[...chats, message]);
            console.log("Received message: ", message);
        });

        socket.on("message_sent", (message)=>{
            console.log("message sent successfully :", message);
            setChats((chats)=>[...chats, message]);
        })

        return ()=>{
            socket.disconnect();
        };
    }, [user]);

    
    const [searchText, setSearchText] = useState("");
    
    const [message, setMessage] = useState("");


    const handleSendChat = ()=>{
        const data = {
            senderId: user?._id,
            receiverId:"69c60ef9d72e1e55ff754880",
            content:message,
        };
        const socket = getSocket();
        socket.emit("send_message", data);
    }

    return (
        <div className={ChatStyle["container"]}>
            <div className={ChatStyle["left"]}>
                <div className={ChatStyle["heading"]}>
                    Persons
                </div>
                <div className={ChatStyle["search-bar"]}>
                    <SearchBar setSearchText={setSearchText} placeholder="Search for Persons" level1={true}/>
                </div>
                <div className={ChatStyle["persons"]}>
                    <PersonTile/>
                    <PersonTile active={true}/>
                    <PersonTile/>
                                        <PersonTile/>
                    <PersonTile active={true}/>
                    <PersonTile/>
                                        <PersonTile/>
                    <PersonTile active={true}/>
                    <PersonTile/>
                </div>
            </div>
            <div className={ChatStyle["right"]}>
                <div className={ChatStyle["header"]}>
                    <div className={ChatStyle["person-profile-status"]}>
                        <div className={ChatStyle["person-profile-container"]}>
                            <img src={UserImage} className={ChatStyle["person-profile"]}/>
                        </div>
                        <div className={ChatStyle["person-data"]}>
                            <div className={ChatStyle["person-name"]}>Aryan Maurya</div>
                            <div className={ChatStyle["person-status"]}>Last seen at 1:45 <span className={ChatStyle["time-specifier"]}>pm</span> </div>
                        </div>
                    </div>
                    <div className={ChatStyle["person-actions"]}>
                        <SearchIcon className={`${ChatStyle["icon"]} ${ChatStyle["large"]}`}/>
                        <ReportUserIcon className={ChatStyle["icon"]}/>
                        <BanIcon className={ChatStyle["icon"]}/>
                    </div>
                </div>



                <div className={ChatStyle["messages"]}>
                    {
                        chats.length===0
                        &&
                        <p className={ChatStyle["label"]}>No messages yet, Say hi to Aryan alsdkfj </p>
                    }
                    {
                        chats.map((chat)=>{
                            return <MessageTile key={chat.content} message={chat.content} time={new Date()} self={chat.senderId==user?._id}/>
                        })
                    }
                    {/* <MessageTile message="How is it going1?" time={new Date()} self={false}/>
                    <MessageTile message="When are you going to finish this project?" time={new Date()} self={false}/>
                    <MessageTile message="When are you going to finisha skjdkfjalskd fjalskd fjalskdj falskdjflaskdjflaksdjfliwpoi jflkajsdfas pasdflka sdflasdoai sdflknasdlkf asd;lfjaspdofu this project?" time={new Date()} self={false}/>
                    <MessageTile message="Very soon" time={new Date()} self={true}/>
                    <MessageTile message="How is it going?" time={new Date()} self={false}/>
                    <MessageTile message="When are you going to finish this project?" time={new Date()} self={false}/>
                    <MessageTile message="When are you going to finisha skjdkfjalskd fjalskd fjalskdj falskdjflaskdjflaksdjfliwpoi jflkajsdfas pasdflka sdflasdoai sdflknasdlkf asd;lfjaspdofu this project?" time={new Date()} self={false}/>
                    
                    <TimelineTile time={new Date()}/>
                    <MessageTile message="Very soon" time={new Date()} self={true}/>
                    <MessageTile message="How is it going?" time={new Date()} self={false}/>
                    <MessageTile message="When are you going to finish this project?" time={new Date()} self={false}/>
                    <MessageTile message="When are you going to finisha skjdkfjalskd fjalskd fjalskdj falskdjflaskdjflaksdjfliwpoi jflkajsdfas pasdflka sdflasdoai sdflknasdlkf asd;lfjaspdofu this project?" time={new Date()} self={false}/>
                    <MessageTile message="Very soon" time={new Date()} self={true}/> */}
                </div>



                <div className={ChatStyle["message-input-wrapper"]}>
                    <div className={ChatStyle["message-input-container"]}>
                        <div className={ChatStyle["message-attachment"]}>
                            <AttachmentIcon className={`${ChatStyle["icon"]} ${ChatStyle["large"]}`}/>
                        </div>
                        <input value={message} type="text" placeholder="Enter your message" className={ChatStyle["message-input"]}
                            onChange={(e)=>{
                                setMessage(e.target.value);
                            }}
                            onKeyDown={(e)=>{
                                if(e.key==="Enter"){
                                    handleSendChat();
                                }
                            }}
                        >
                            
                        </input>
                        <div className={ChatStyle["message-send"]}>
                            <SendIcon className={`${ChatStyle["icon"]} ${ChatStyle["large"]}`}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}