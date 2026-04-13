import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service";
import { fetchMessagesService } from "../../services/chat/fetchMessages.service";
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
    contacts: ContactInterface[],
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
            setChatsHandler(message);
            // console.log("setting chats")
            // console.log("Received message: ", message);
        };

        const sentHandler = (message: ChatMessageInterface)=>{
            // console.log("message sent successfully :", message);
            console.log("before: ");
            
            console.log("activeConversation id: ", activeContact);
            setChatsMap((chats)=>{
                console.log("new chatsMap: ", chats);
                return chats;
            })
            if(activeContact?.conversationId==="new_conversation"){
                // Todo: Have to make this work
                
                setContacts((prev)=>(
                    prev.map(contact=>{
                        if(contact.person._id === activeContact?.person._id){
                            console.log("updating contact: ", contact);
                            
                            return {
                                ...contact,
                                conversationId: message.conversationId,
                            };
                        }
                        return contact;
                    })
                ));
                setActiveContact((prev)=>{
                    if(!prev) return prev;
                    return {
                        ...prev,
                        conversationId: message.conversationId,
                    }
                })
            }
            setChatsHandler(message);

            console.log("after: ");
            
            console.log("activeConversation id: ", activeContact);
            setChatsMap((chats)=>{
                console.log("new chatsMap: ", chats);
                return chats;
            })
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

    const fetchMessagesHandler = async (conversationId: string)=>{
        try{
            if(conversationId==="new_conversation"){
                return;
            }
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