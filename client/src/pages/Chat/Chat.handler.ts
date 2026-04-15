import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service";
import { fetchMessagesService, markAsSeenService } from "../../services/chat/messages.service";
import { getContactsService, getUserContactDetailsService } from "../../services/chat/contacts.service"
import { showToast } from "../../utils/toast.util";
import type { ChatMessageInterface, ContactInterface, FetchMessagesResponse, GetContactsResponse, GetUserContactDetailsResponse } from "../../types/ApiResponse/chat.type";
// import { connectSocket } from "../../services/socket.service";
import { useAppSelector } from "../../hooks/store.hook";
import { useEffect } from "react";
import type { Socket } from "socket.io-client";
import type { SendMessagePayload } from "../../types/ApiRequest/chat.type";
import type { ChatsMapInterface } from "./Chat";


export const useChatHandler = (
    socket: Socket | null,
    activeContact: ContactInterface | undefined,
    // contactsMap: Map<any, any>,
    setChatsMap: React.Dispatch<React.SetStateAction<ChatsMapInterface>>,
    setContacts: React.Dispatch<React.SetStateAction<ContactInterface[]>>,
    setFetching: React.Dispatch<React.SetStateAction<boolean>>,
    setActiveContact: React.Dispatch<React.SetStateAction<ContactInterface | undefined>>,
)=>{

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
                    console.log("contact already present! : ", exists);
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
                    unreadCount: 1,
                };

                return [contactObj, ...prev];
            });

            updateLastMessageHandler(message, true);

            if(activeContact?.person._id === message.sender._id){
                // console.log("captured as same");
                
                if((activeContact.unreadCount)>0){
                    // console.log("Updating the current contact: ", activeContact);
                    
                    markAsSeenHandler(message.conversationId);
                }
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

        socket.on("receive_message", receiveHandler);

        socket.on("message_sent", sentHandler);

        return ()=>{
            socket.off("receive_message");
            socket.off("message_sent");
        }
    }, [user, activeContact]);


    const sendMessageHandler = async (message:string)=>{
        message = message.trim();
        if(!activeContact || !socket || !message) return;
        const data:SendMessagePayload = {
            senderId: user?._id!,
            receiverId: activeContact?.person._id,
            content:message,
            type: "text",
        };
        // console.log("sending message to socket: ", data);
        socket.emit("send_message", data);
    }

    const getContactsHandler = async ()=>{
        try{
            setFetching(true);
            const response = await getContactsService();
            const result = parseSuccessResponse<GetContactsResponse>(response);
            setContacts(result.data?.contacts??[]);
            // console.log("here: ", result.data);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }finally{
            setFetching(false);
        }
    }

    const updateLastMessageHandler = async (message: ChatMessageInterface, update: boolean)=>{
        setContacts(
            (prev)=>{
                return prev.map((cont)=>{
                    if(cont.conversationId === message.conversationId){
                        const tempCont = {
                            ...cont,
                            lastMessage: {
                                content: message.content,
                                messageType: message.type,
                                sender: message.sender._id,
                                sentAt: message.sentAt,
                            },
                            unreadCount: (cont.unreadCount>=0)? (cont.unreadCount+(update?1:0)):0,
                        };
                        if(cont.conversationId === activeContact?.conversationId){
                            activeContact.unreadCount = tempCont.unreadCount;
                        }
                        return tempCont;
                    }
                    return cont;
                });
            }
        );
    }

    const markAsSeenHandler = async (conversationId: string)=>{
        await markAsSeenService({conversationId});
        setContacts(
            (prev)=>{
                return prev.map((cont)=>{
                    if(cont.conversationId === conversationId){
                        return {
                            ...cont,
                            unreadCount: 0,
                        };
                    }
                    return cont;
                });
            }
        );
    }

    const fetchMessagesHandler = async (conversationId: string)=>{
        try{
            if(conversationId==="new_conversation"){
                // console.log("new_conversation request, contact: ", activeContact);
                return;
            }
            markAsSeenHandler(conversationId);
            const response = await fetchMessagesService({conversationId});
            const result = parseSuccessResponse<FetchMessagesResponse>(response);
            // setChats(result.data?.messages);
            setMultipleChatsHandler(conversationId, result.data?.messages??[]);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
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
            console.log(result.data);
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
        sendMessageHandler,
        initChatHandler,
        getContactsHandler,
        fetchMessagesHandler,
    }
}