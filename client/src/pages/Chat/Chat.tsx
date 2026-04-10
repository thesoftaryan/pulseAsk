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
// import { TimelineTile } from "./TimelineTile/TimelineTile";
import { useEffect, useMemo, useRef, useState } from "react";

// Socket io
// import { createSocket, getSocket } from "../../services/socket.service";
import { useAppSelector } from "../../hooks/store.hook";
import { useChatHandler } from "./Chat.handler";
import { useSearchParams } from "react-router-dom";
import type { SendMessagePayload } from "../../types/ApiRequest/chat.type";
import type { ChatMessageInterface, ContactInterface } from "../../types/ApiResponse/chat.type";
import { useSocket } from "../../hooks/useSocket.hook";

export const Chat = ()=>{

    
    const messageEndRef = useRef<HTMLDivElement>(null);
    
    const [contacts, setContacts] = useState<ContactInterface[]>([]);
    const [activeContact, setActiveContact] = useState<ContactInterface | undefined>();
    const [fetching, setFetching] = useState(false);
    const [chats, setChats] = useState<ChatMessageInterface[]>([]);
    
    const user = useAppSelector(state=>state.auth.user);
    
    const socket = useSocket(user?._id);

    const {
        initChatHandler,
        getContactsHandler,
        fetchMessagesHandler,
    } = useChatHandler(
        socket,
        activeContact,
        setChats,
        setContacts,
        setFetching,
        setActiveContact,
    );
    
    const [searchParams] = useSearchParams();
    const chatUserId = searchParams.get("user");
    const [initContact, setInitContact] = useState<any>();


    useEffect(()=>{
        // console.log("calling getContactsHandler");
        getContactsHandler();
    }, []);

    if(chatUserId){
        useEffect(()=>{
            initChatHandler(chatUserId, setInitContact, setActiveContact);
        }, []);
    }

    /*  Handling the case when current user already
        have a conversation with a person and he
        (current User) comes from the profile of 
        that user with which he already talked with
    */
    const contactsMap = useMemo(()=>{
        const map = new Map();
        contacts.forEach((contact)=>map.set(contact.person._id, contact));
        return map;
    }, [contacts]);

    useEffect(()=>{
        if(!initContact) return;
        // console.log("init Contact: ", initContact);
        const contact = contactsMap.get(initContact.person._id);
        if(contact){
            // console.log("duplicate contact: ", contact);
            setActiveContact(contact);
            setInitContact(undefined);
        }
    }, [contactsMap]);
    

    useEffect(()=>{
        if(!activeContact) return;
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
        if(!activeContact || !socket) return;
        const data:SendMessagePayload = {
            senderId: user?._id!,
            receiverId: activeContact?.person._id,
            content:message,
            type: "text",
        };
        console.log("sending message to socket: ", data);
        
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
                        <ContactTile key={-1} contact={initContact} active={activeContact?.conversationId===initContact?.conversationId} onClick={()=>setActiveContact(initContact)}/>
                    }
                    {
                        contacts.map((contact)=>{
                            return <ContactTile active={contact.conversationId === activeContact?.conversationId} onClick={()=>{setActiveContact(contact); console.log("setting :", contact, " as active");}} contact={contact} key={contact.conversationId}/>
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
                            (chats?.length??0)===0
                            &&
                            <p className={ChatStyle["label"]}>No messages yet, Say hi to Aryan alsdkfj </p>
                        }
                        {
                            chats?.map((chat)=>{
                                return <MessageTile key={chat._id} message={chat.content} time={chat.sentAt} self={chat.sender._id==user?._id}/>
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