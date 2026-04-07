import { parseErrorResponse, parseSuccessResponse } from "../../services/apiResponseParser.service";
import { fetchMessagesService } from "../../services/chat/fetchMessages.service";
import { getContactsService, getUserContactDetailsService } from "../../services/chat/contacts.service"
import { showToast } from "../../utils/toast.util";


export const useChatHandler = (
    setChats: React.Dispatch<React.SetStateAction<any>>,
    setContacts: React.Dispatch<React.SetStateAction<any[]>>,
    setFetching: React.Dispatch<React.SetStateAction<boolean>>,
)=>{

    const getContactsHandler = async ()=>{
        try{
            setFetching(true);
            const response = await getContactsService();
            const result = parseSuccessResponse<any>(response);
            setContacts(result.data);
            console.log("here: ", result.data);
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
            const result = parseSuccessResponse<any>(response);
            setChats(result.data);
        }catch(error){
            const err = parseErrorResponse(error);
            showToast.error(err.message);
        }
    }

    const initChatHandler = async (
        chatUser: string, 
        setInitContact: React.Dispatch<React.SetStateAction<{
            person: {
                _id: string | null;
                profile: string;
                firstName: string;
                lastName: string;
            };
        }>>,
    )=>{
        try{
            setFetching(true);
            const response = await getUserContactDetailsService({userId: chatUser});
            const result = parseSuccessResponse<any>(response);
            console.log(result.data);
            
            setInitContact(result.data);
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