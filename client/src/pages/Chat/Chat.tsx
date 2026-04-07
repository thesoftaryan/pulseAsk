import { SearchBar } from "../../components/layout/SearchBar/SearchBar";
import ChatStyle from "./Chat.module.css";
import { ContactTile } from "./ContactTile/ContactTile";


import defaultImage from "../../assets/images/user.png";

import SendIcon from "../../assets/icons/general/send.svg?react";
import AttachmentIcon from "../../assets/icons/general/attachment.svg?react";
import BanIcon from "../../assets/icons/general/ban.svg?react";
import SearchIcon from "../../assets/icons/header/search.svg?react";
import ReportUserIcon from "../../assets/icons/general/report_user.svg?react";
import { MessageTile } from "./MessageTile/MessageTile";
import { TimelineTile } from "./TimelineTile/TimelineTile";
import { useEffect, useRef, useState } from "react";

// Socket io
import { connectSocket, getSocket } from "../../services/socket.service";
import { useAppSelector } from "../../hooks/store.hook";
import { useChatHandler } from "./Chat.handler";
import { useSearchParams } from "react-router-dom";
import Divider from "../../components/common/Divider/Divider";

interface chatInterface{
    _id: string;
    sender: string,
    content: string,
    sentAt: Date,
}

export const Chat = ()=>{

    
    const messageEndRef = useRef<HTMLDivElement>(null);
    
    const [contacts, setContacts] = useState<any[]>([]);
    const [activeContact, setActiveContact] = useState<any>();
    const [fetching, setFetching] = useState(false);
    const [chats, setChats] = useState<chatInterface[]>([]);
    
    const user = useAppSelector(state=>state.auth.user);
    
    const {initChatHandler, getContactsHandler, fetchMessagesHandler} = useChatHandler(setChats, setContacts, setFetching);
    
    const [searchParams] = useSearchParams();
    const chatUserId = searchParams.get("user");
    // const [initContact, setInitContact] = useState({
    //     person:{
    //         _id: chatUserId,
    //         profile:"",
    //         firstName:"Anonymous",
    //         lastName:"",
    //     }
    // });

    if(chatUserId){
        useEffect(()=>{
            initChatHandler(chatUserId, setActiveContact);
        }, []);
    }



    
    
    useEffect(()=>{
        console.log("calling getContactsHandler");
        
        getContactsHandler();
    }, []);

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
            if(!activeContact.conversationId){
                setActiveContact((prev: any)=>{
                    return {...prev, conversationId: message.conversationId}
                });
            }
        })

        return ()=>{
            socket.disconnect();
        };
    }, [user]);

    useEffect(()=>{
        fetchMessagesHandler(activeContact?.conversationId);
    }, [activeContact]);


    useEffect(()=>{
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
        })
    }, [chats]);

    
    const [searchText, setSearchText] = useState("");
    
    const [message, setMessage] = useState("");


    const handleSendChat = ()=>{
        const data = {
            senderId: user?._id,
            receiverId: activeContact.person._id,
            content:message,
        };
        const socket = getSocket();
        socket.emit("send_message", data);
        setMessage("");
    }

    if(fetching){
        return "Loading";
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
                    {
                        (contacts.length===0 && !chatUserId)
                        &&
                        <p className={ChatStyle["label"]}>You haven't talked with anyone</p>
                    }
                    {
                        chatUserId
                        &&
                        <ContactTile key={-1} contact={activeContact} active={activeContact?.conversationId==="new_conversation"} onClick={()=>setActiveContact({...activeContact, conversationId:"new_conversation"})}/>
                    }
                    {
                        contacts.map((contact)=>{
                            return <ContactTile active={contact.conversationId === activeContact?.conversationId} onClick={()=>{setActiveContact(contact)}} contact={contact} key={contact.conversationId}/>
                        })
                    }
                    
                    {/* <ContactTile/>
                    <ContactTile active={true}/>
                    <ContactTile/> */}
                </div>
            </div>
            {
                activeContact?
                <div className={ChatStyle["right"]}>
                    <div className={ChatStyle["header"]}>
                        <div className={ChatStyle["person-profile-status"]}>
                            <div className={ChatStyle["person-profile-container"]}>
                                <img src={activeContact.person.profile??defaultImage} className={ChatStyle["person-profile"]}/>
                            </div>
                            <div className={ChatStyle["person-data"]}>
                                <div className={ChatStyle["person-name"]}>{activeContact.person.firstName} {activeContact.person.lastName}</div>
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
                                return <MessageTile key={chat._id} message={chat.content} time={chat.sentAt} self={chat.sender==user?._id}/>
                            })
                        }
                        <div ref={messageEndRef}/>
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
                                <SendIcon onClick={handleSendChat} className={`${ChatStyle["icon"]} ${ChatStyle["large"]}`}/>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <p className={ChatStyle["label"]}> Select a contact to message </p>
            }
        </div>
    );
}