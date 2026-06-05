import { parseErrorResponse, parseSuccessResponse } from "../../../../services/apiResponseParser.service";
import { fetchNotificationsService } from "../../../../services/notification.service"


export const useNotificationModal = (
    setNotifications : React.Dispatch<any[]>,
)=>{

    // registering for socket notification


    // fetching initial notifications
    const fetchNotifications = async ()=>{
        try{
            const response = await fetchNotificationsService();
            const result = parseSuccessResponse<any>(response);
            setNotifications(result.data.notifications);
            console.log(result.data);
        }catch(error){
            const err = parseErrorResponse(error);
            console.error(err.message);
        }
    }
    return {
        fetchNotifications,
    }
}