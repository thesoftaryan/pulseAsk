import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service";
import { fetchMessagesService, markAsSeenService } from "../../services/chat/messages.service";
import { getContactsService, getUserContactDetailsService } from "../../services/chat/contacts.service"
import { showToast } from "../../utils/toast.util";
import type { ChatMessageInterface, ContactInterface, FetchMessagesResponse, GetContactsResponse, GetUserContactDetailsResponse } from "../../types/ApiResponse/chat.type";
// import { connectSocket } from "../../services/socket.service";
import { useAppDispatch, useAppSelector } from "../../hooks/store.hook";
import { useEffect, useState} from "react";
import type { Socket } from "socket.io-client";
import type { SendMessagePayload } from "../../types/ApiRequest/chat.type";
import type { ChatsMapInterface } from "./Chat";
import { updateUnreadChatCount } from "../../store/auth/auth.slice";

export const useChatHandler = (
    socket: Socket | null,
    activeContact: ContactInterface | undefined,
    // contactsMap: Map<any, any>,
    setChatsMap: React.Dispatch<React.SetStateAction<ChatsMapInterface>>,
    setContacts: React.Dispatch<React.SetStateAction<ContactInterface[]>>,
    setFetching: React.Dispatch<React.SetStateAction<boolean>>,
    setActiveContact: React.Dispatch<React.SetStateAction<ContactInterface | undefined>>,
)=>{

    const [fetchingContacts, setFetchingContacts] = useState(false);
    const [fetchingConversation, setFetchingConversation] = useState(false);

    const dispatch = useAppDispatch();

    const user = useAppSelector(state=>state.auth.user);

    const setChatsHandler = (message: ChatMessageInterface)=>{
        setChatsMap((chats)=>(
            {
                ...chats,
                [message.conversationId] : [
                    ...(chats[message.conversationId]||[]),
                    message,
                ]
            }
        ));
    }

    const setMultipleChatsHandler = (conversationId:string, messages: ChatMessageInterface[])=>{
        setChatsMap((chats)=>(
            {
                ...chats,
                [conversationId] : messages,
            }
        ));
    }

    const updateUserStatusHandler = (data : any)=>{
        const {userId, status} = data;
        // console.log("data: ", data);
        
        // console.log("userId: ", userId, " changed to ", status);
        
        setContacts((prev)=>{
            return prev.map((cont)=>{
                if(userId===cont.person._id){
                    if(activeContact?.person._id === userId){
                        setActiveContact((prev)=>{
                            if(!prev) return prev;
                            return {
                                ...prev,
                                person:{
                                    ...prev.person,
                                    status,
                                    lastSeen: new Date(),
                                }
                            }
                        });
                    }
                    return {
                        ...cont,
                        person: {
                            ...cont.person,
                            status,
                            lastSeen: new Date(),
                        }
                    }
                }
                return cont;
            });
        });
    }


    // To handle socket events
    useEffect(()=>{
        if(!socket) return;
        
        const receiveHandler = (message : ChatMessageInterface)=>{
            // console.log("received message: ", message);
            // console.log("activeContact: ", activeContact);
            
            // To prevent adding messages two times sent by user to himself
            if(message.sender._id == user?._id) {
                return;
            }

            // Flow :
            /**
             * When a message is received, we will make sure
             * that along with message we are getting unreadCount
             * as well. and then we will update the unread count
             * in the respective contact.
             */

            setContacts(prev => {
                const exists = prev.find(
                    c => c.person._id === message.sender._id
                );

                if (exists){
                    // console.log("contact already present! : ", exists);
                    return prev;
                }

                const contactObj: ContactInterface = {
                    conversationId: message.conversationId,
                    person: message.sender,
                    lastMessage: {
                        content: message.content,
                        messageType: message.type,
                        sender: message.sender._id,
                        sentAt: message.sentAt,
                    },
                    unreadCount: 0,
                };

                return [contactObj, ...prev];
            });

            updateLastMessageHandler(message, true);

            if(activeContact?.person._id === message.sender._id){
                markAsSeenHandler(message.conversationId);
            }

            setChatsHandler(message);
            // console.log("setting chats")
            // console.log("Received message: ", message);
        };

        const sentHandler = (message: ChatMessageInterface)=>{
            // console.log("message sent successfully :", message);
            // console.log("before: ");
            
            // console.log("activeConversation id: ", activeContact);
            // setChatsMap((chats)=>{
            //     console.log("new chatsMap: ", chats);
            //     return chats;
            // });
            if(activeContact?.conversationId==="new_conversation"){
                // Todo: Have to make this work
                
                setContacts((prev)=>{
                    return [{
                        ...activeContact,
                        conversationId: message.conversationId,
                    }, ...prev];
                });
                setActiveContact((prev)=>{
                    if(!prev) return prev;
                    return {
                        ...prev,
                        conversationId: message.conversationId,
                    }
                });
            }
            updateLastMessageHandler(message, false);
            setChatsHandler(message);


            // console.log("after: ");
            
            // console.log("activeConversation id: ", activeContact);
            // setChatsMap((chats)=>{
            //     console.log("new chatsMap: ", chats);
            //     return chats;
            // })
        }

        const errorHandler = (error : string)=>{
            showToast.error(error);
        }

        socket.on("receive_message", receiveHandler);

        socket.on("message_sent", sentHandler);

        socket.on("user_status", updateUserStatusHandler);

        socket.on("sending_error", errorHandler);

        return ()=>{
            socket.off("receive_message");
            socket.off("message_sent");
            socket.off("user_status");
            socket.off("sending_error");
        }
    }, [user, activeContact]);


    const sendMessageHandler = async (message:string, imageUrl?: string)=>{
        message = message.trim();
        if(!activeContact || !socket || (!message && !imageUrl)) return;
        const data:SendMessagePayload = {
            senderId: user?._id!,
            receiverId: activeContact?.person._id,
            content:imageUrl??message,
            caption: imageUrl? message:"",
            type: imageUrl? "image":"text",
        };
        // console.log("sending message to socket: ", data);
        socket.emit("send_message", data);
    }

    const getContactsHandler = async ()=>{
        try{
            setFetchingContacts(true);
            const response = await getContactsService();
            const result = parseSuccessResponse<GetContactsResponse>(response);
            setContacts(result.data?.contacts??[]);
            // console.log("here: ", result.data);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setFetchingContacts(false);
        }
    }

    const updateLastMessageHandler = async (message: ChatMessageInterface, update: boolean)=>{
        setContacts(
            (prev)=>{
                return prev.map((cont)=>{
                    if(cont.conversationId === message.conversationId){
                        let newUnreadCount=cont.unreadCount;
                        if(cont.lastMessage?.sender === user?._id){
                            newUnreadCount=0;
                        }
                        if(cont.unreadCount>=0){
                            newUnreadCount = newUnreadCount + (update? 1:0);
                        }
                        return {
                            ...cont,
                            lastMessage: {
                                caption: message.caption,
                                content: message.content,
                                messageType: message.type,
                                sender: message.sender._id,
                                sentAt: message.sentAt,
                            },
                            unreadCount: newUnreadCount,
                        };
                    }
                    return cont;
                });
            }
        );
    }

    const markAsSeenHandler = async (conversationId: string)=>{
        try{
            await markAsSeenService({conversationId});
            setContacts(
                (prev)=>{
                    return prev.map((cont)=>{
                        if(cont.conversationId === conversationId){
                            // if(cont.person._id === activeContact?.person._id){
                                //     setActiveContact((prev)=>{
                                    //         if(!prev) return;
                                    //         return {
                                        //             ...prev,
                                        //             unreadCount:0,
                                        //         }
                                        //     });
                                        // }
                            if(cont.lastMessage?.sender != user?._id){                                
                                dispatch(updateUnreadChatCount({change: -cont.unreadCount}));
                            }
                            return {
                                ...cont,
                                unreadCount: 0,
                            };
                        }
                        return cont;
                    });
                }
            );
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    const fetchMessagesHandler = async (conversationId: string)=>{
        try{
            setFetchingConversation(true);
            if(conversationId==="new_conversation"){
                // console.log("new_conversation request, contact: ", activeContact);
                return;
            }
            markAsSeenHandler(conversationId);
            const response = await fetchMessagesService({conversationId});
            const result = parseSuccessResponse<FetchMessagesResponse>(response);
            // setChats(result.data?.messages);
            // console.log(result);
            setMultipleChatsHandler(conversationId, result.data?.messages??[]);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setFetchingConversation(false);
        }
    }

    const initChatHandler = async (
        chatUser: string, 
        setInitContact: React.Dispatch<React.SetStateAction<any>>,
        setActiveContact: React.Dispatch<React.SetStateAction<any>>,
    )=>{
        try{
            setFetching(true);
            const response = await getUserContactDetailsService({userId: chatUser});
            const result = parseSuccessResponse<GetUserContactDetailsResponse>(response);
            // console.log(result.data);
            setInitContact(result.data);
            setActiveContact(result.data);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setFetching(false);
        }
    }


    return {
        fetchingContacts,
        fetchingConversation,
        sendMessageHandler,
        initChatHandler,
        getContactsHandler,
        fetchMessagesHandler,
    }
}