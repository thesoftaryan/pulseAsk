import type { Socket } from "socket.io-client";
import { parseErrorResponse, parseSuccessResponse } from "../../../../services/apiResponseParser.service";
import { fetchNotificationsService, markNotificationAsSeenService } from "../../../../services/notification.service"
import { useEffect } from "react";


export const useNotificationModal = (
    socket: Socket | null,
    setNotifications : React.Dispatch<React.SetStateAction<any[]>>,
    setWorking : React.Dispatch<React.SetStateAction<boolean>>,
)=>{

    // registering for socket notification
    useEffect(()=>{
        if(!socket) return;
        
        const handler = (data: any) => {
            setNotifications(prev => [...prev, data]);
        };
        socket.on("notification:new", handler);
        return () => {
            socket.off("notification:new", handler);
        };
    }, [socket]);

    // fetching initial notifications
    const fetchNotifications = async ()=>{
        try{
            setWorking(true);
            const response = await fetchNotificationsService();
            const result = parseSuccessResponse<any>(response);
            setNotifications(result.data.notifications);
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