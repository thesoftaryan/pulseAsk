import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service";
import { fetchMessagesService } from "../../services/chat/fetchMessages.service";
import { getContactsService, getUserContactDetailsService } from "../../services/chat/contacts.service"
import { showToast } from "../../utils/toast.util";
import type { ContactInterface, FetchMessagesResponse, GetContactsResponse, GetUserContactDetailsResponse } from "../../types/ApiResponse/chat.type";
// import { connectSocket } from "../../services/socket.service";
import { useAppSelector } from "../../hooks/store.hook";
import { useEffect } from "react";
import type { Socket } from "socket.io-client";


export const useChatHandler = (
    socket: Socket | null,
    activeContact: ContactInterface | undefined,
    setChats: React.Dispatch<React.SetStateAction<any>>,
    setContacts: React.Dispatch<React.SetStateAction<any[]>>,
    setFetching: React.Dispatch<React.SetStateAction<boolean>>,
    setActiveContact: React.Dispatch<React.SetStateAction<ContactInterface | undefined>>,
)=>{

    const user = useAppSelector(state=>state.auth.user);

    useEffect(()=>{
        if(!socket) return;
        
        const receiveHandler = (message : any)=>{
            // console.log("received message: ", message);
            // console.log("activeContact: ", activeContact);
            
            if(message.sender._id != activeContact?.person._id){
                return;
            }
            // console.log("setting chats")
            if(message.sender._id != user?._id) setChats((chats: any)=>[...chats, message]);
            // console.log("Received message: ", message);
        };

        const sentHandler = (message: any)=>{
            // console.log("message sent successfully :", message);
            
            setChats((chats: any)=>[...chats, message]);
            if(!activeContact?.conversationId){
                setActiveContact((prev: any)=>{
                    return {...prev, conversationId: message.conversationId}
                });
            }
        }

        socket.on("receive_message", receiveHandler);

        socket.on("message_sent", sentHandler);

        return ()=>{
            socket.off("receive_message");
            socket.off("message_sent");
        }
    }, [user, activeContact]);


    // const sendMessageHandler = async ()=>{

    // }

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
                setChats([]);
                return;
            }
            const response = await fetchMessagesService({conversationId});
            const result = parseSuccessResponse<FetchMessagesResponse>(response);
            setChats(result.data?.messages);
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
        initChatHandler,
        getContactsHandler,
        fetchMessagesHandler,
    }
}