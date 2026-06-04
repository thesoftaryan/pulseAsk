import { createAnswerNotificationService } from "../services/notification.service";
import { emitSocketNotification } from "../socket/notification.socket";
import { appEventEmitter } from "../emitter/emitter";

appEventEmitter.on(
    "answer.created",
    async (data)=>{
        const notification = await createAnswerNotificationService(data);
        emitSocketNotification(data.senderId, notification, "answer");
    }
)