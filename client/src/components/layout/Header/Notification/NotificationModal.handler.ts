import { parseErrorResponse, parseSuccessResponse } from "../../../../services/apiResponseParser.service";
import { fetchNotificationsService, markNotificationAsSeenService } from "../../../../services/notification.service"
import { useAppDispatch } from "../../../../hooks/store.hook";
import { updateUnreadNotificationCount } from "../../../../store/auth/auth.slice";


export const useNotificationModal = (
    setNotifications : React.Dispatch<React.SetStateAction<any[]>>,
    setWorking : React.Dispatch<React.SetStateAction<boolean>>,
)=>{

    const dispatch = useAppDispatch();

    // fetching initial notifications
    const fetchNotifications = async ()=>{
        try{
            setWorking(true);
            const response = await fetchNotificationsService();
            const result = parseSuccessResponse<any>(response);
            let notifications = result.data.notifications;
            notifications.reverse();
            setNotifications(notifications);
            console.log(result.data);
        }catch(error){
            const err = parseErrorResponse(error);
            console.error(err.message);
        }finally{
            setWorking(false);
        }
    }

    const markNotificationAsSeenHandler = async (notificationId:string)=>{
        try{
            const response = await markNotificationAsSeenService({notificationId});
            const result = parseSuccessResponse<any>(response);
            dispatch(updateUnreadNotificationCount({change: -1}));
            setNotifications((prev)=>{
                let notifications=[];
                for(let notification of prev){
                    if(notification._id == notificationId){
                        notification.isRead = true;
                    }
                    notifications.push(notification);
                }
                return notifications;
            });
            console.log(result.data);
        }catch(error){
            const err = parseErrorResponse(error);
            console.error(err.message);
        }
    }

    return {
        fetchNotifications,
        markNotificationAsSeenHandler,
    }
}