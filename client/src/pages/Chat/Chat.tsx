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
import { useEffect, useMemo, useRef, useState } from "react";

// Socket io
// import { createSocket, getSocket } from "../../services/socket.service";
import { useAppSelector } from "../../hooks/store.hook";
import { useChatHandler } from "./Chat.handler";
import { useSearchParams } from "react-router-dom";
// import type { SendMessagePayload } from "../../types/ApiRequest/chat.type";
import type { ChatMessageInterface, ContactInterface } from "../../types/ApiResponse/chat.type";
// import { useSocket } from "../../hooks/useSocket.hook";
import { getSocket } from "../../services/socket.service";
import { relativeDateFormat, relativeTimeFormat } from "../../utils/formatDateTime.util";
import { TimelineTile } from "./TimelineTile/TimelineTile";
import { PreviewImageTile } from "./PreviewImageTile/PreviewImageTile";
import { useUploadImage } from "../../hooks/uploadImage.hook";

export interface ChatsMapInterface{
    [conversationId: string] : ChatMessageInterface[],
}

export const Chat = ()=>{

    const messageEndRef = useRef<HTMLDivElement>(null);
    
    const [contacts, setContacts] = useState<ContactInterface[]>([]);
    const [activeContact, setActiveContact] = useState<ContactInterface | undefined>();
    const [fetching, setFetching] = useState(false);
    const [chats, setChats] = useState<ChatMessageInterface[]>([]);
    const [chatsMap, setChatsMap] = useState<ChatsMapInterface>({});
    
    // let chats:ChatMessageInterface[]=[];
    
    const user = useAppSelector(state=>state.auth.user);
    
    let socket = getSocket();

    // To get initial contacts of the user
    useEffect(()=>{
        // console.log("calling getContactsHandler");
        getContactsHandler();
    }, []);

    const [searchParams] = useSearchParams();
    const chatUserId = searchParams.get("user");
    const [initContact, setInitContact] = useState<ContactInterface | undefined>();
 
 
    // To handle new chat flow creation
    useEffect(()=>{
        if(!chatUserId) return;
        initChatHandler(chatUserId, setInitContact, setActiveContact);
    }, [chatUserId]);
 
 
    // To fetch messages every time active chat is changed
    useEffect(()=>{
        if(!activeContact) return;
        fetchMessagesHandler(activeContact?.conversationId);
    }, [activeContact?.conversationId]);
 
    // For setting current chats when a new chat arrives and added to chatsMap
    useEffect(()=>{
        setChats(chatsMap[activeContact?.conversationId??""]??[])
    }, [chatsMap]);
 
    // For scrolling to the end of chat if new message comes
    useEffect(()=>{
        messageEndRef.current?.scrollIntoView({
            behavior: "smooth",
        })
    }, [chats]);
    
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
    
    // To remove the initial contact upon getting conversation Id
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
    
    // Importing functions from Handler
    const {
        sendMessageHandler,
        initChatHandler,
        getContactsHandler,
        fetchMessagesHandler,
    } = useChatHandler(
        socket,
        activeContact,
        // contactsMap,
        setChatsMap,
        setContacts,
        setFetching,
        setActiveContact,
    );
    

    
    const [searchText, setSearchText] = useState("");
    
    const [message, setMessage] = useState("");


    
    
    const getChatWithTimelines = (
        chats: ChatMessageInterface[]
    ): React.ReactNode[] => {
        
        if (chats.length === 0) return [];
        
        const components: React.ReactNode[] = [];
        
        let currDay = relativeDateFormat(chats[0].sentAt);
        
        components.push(
            <div key={`timeline-div-0`} className={ChatStyle["sticky"]}>
                <TimelineTile key={`timeline-0`} time={currDay}/>
            </div>
        );
        
        chats.forEach((chat, index) => {
            const chatDay = relativeDateFormat(chat.sentAt);
            
            if (chatDay !== currDay) {
                currDay = chatDay;
                components.push(
                    <div key={`timeline-div-${index+1}`}  className={ChatStyle["sticky"]}>
                        <TimelineTile key={`timeline-${index+1}`} time={chatDay}/>
                    </div>
                );
            }
            
            components.push(
                <MessageTile
                key={chat._id}
                message={chat}
                self={chat.sender._id === user?._id}
                />
            );
        });
        
        return components;
    };
    
    
    
    // To enable the feature of searching into current contacts
    const currentContacts = useMemo(()=>{
        
        const searchValue = searchText.trim().toLocaleLowerCase();
        if(!searchValue) return contacts;
        
        return contacts.filter(
            (contact)=>{
                const searchData = `${contact.person.firstName.toLowerCase()} ${contact.person.lastName?.toLowerCase()} ${contact.person.userName.toLowerCase()}`;
                return searchData.includes(searchValue);
            }
        );
    }, [contacts, searchText]);
    
    
    // Image message handling
    const [imageFile, setImageFile] = useState<File|null>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const {uploadImageHandler, uploading} = useUploadImage();
    const inputFileRef = useRef<HTMLInputElement>(null);
    
    const handleImageMessage = (e : React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(!file) return;
        setImageFile(file);
        setPreviewUrl(URL.createObjectURL(file));
    }
    
    const handleImageRemoval = ()=>{
        setImageFile(null);
        setPreviewUrl(null);
    }

    const handleSendChat = async ()=>{
        if(uploading) return;
        let imageUrl:string|undefined;
        if(imageFile){
            imageUrl = await uploadImageHandler(imageFile,  true);
            setImageFile(null);
            setPreviewUrl(null);
        }
        sendMessageHandler(message, imageUrl);
        setMessage("");
    }

    if(fetching){
        return "Loading";
    }

    return (
        <div className={ChatStyle["container"]}>
            <div className={ChatStyle["left"]}>
                <div className={ChatStyle["heading"]}>
                    Contacts
                </div>
                <div className={ChatStyle["search-bar"]}>
                    <SearchBar collapse={false} setSearchText={setSearchText} placeholder="Search for Person" level1={true}/>
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
                        <ContactTile key={initContact?.person._id} contact={initContact!} active={activeContact?.conversationId===initContact?.conversationId} onClick={()=>setActiveContact(initContact)}/>
                    }
                    {
                        currentContacts.map((contact)=>{
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
                                <img src={activeContact.person.profile??defaultImage} className={`${ChatStyle["person-profile"]} ${activeContact.person.status==="online"? ChatStyle["person-online"]:""}`}/>
                                
                            </div>
                            <div className={ChatStyle["person-data"]}>
                                <div className={ChatStyle["person-name"]}>{activeContact.person.firstName} {activeContact.person.lastName}</div>
                                <div className={ChatStyle["person-status"]}>{
                                    activeContact.person.status==="online"?
                                    "online"
                                    :
                                    `Last seen ${relativeTimeFormat(activeContact.person.lastSeen)}`
                                }</div>
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
                            ((chats.length??0)===0)?
                            <p className={ChatStyle["label"]}>No messages yet, Say hi to {activeContact.person.firstName} </p>
                            :
                            getChatWithTimelines(chats)
                        }
                        <div ref={messageEndRef}/>
                    </div>



                    <div className={ChatStyle["message-input-wrapper"]}>
                        <div className={ChatStyle["image-message-preview"]}>
                            {
                                previewUrl
                                &&
                                <PreviewImageTile imageUrl={previewUrl} onDelete={handleImageRemoval} uploading={uploading}/>
                            }
                        </div>
                        <div className={ChatStyle["message-input-container"]}>
                            <div className={ChatStyle["message-attachment"]}>
                                <input type="file" accept="image/*" ref={inputFileRef} onChange={handleImageMessage} className="display-none"/>
                                <AttachmentIcon onClick={()=>{inputFileRef.current?.click()}} className={`${ChatStyle["icon"]} ${ChatStyle["large"]}`}/>
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