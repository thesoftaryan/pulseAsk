import { createAnswerNotificationService, createTransactionNotificationService } from "../services/notification.service";
import { emitSocketNotification } from "../socket/notification.socket";
import { appEventEmitter } from "../emitter/emitter";

appEventEmitter.on(
    "answer.created",
    async (data)=>{
        const notification = await createAnswerNotificationService(data);
        emitSocketNotification(data.receiverId, notification, "answer");
    }
);

appEventEmitter.on(
    "payment.made",
    async (data)=>{
        const notification = await createTransactionNotificationService(data);
        emitSocketNotification(data.receiverId, notification, "payment");
    }
);