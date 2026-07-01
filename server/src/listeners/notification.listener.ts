import { createAnswerNotificationService, createTransactionNotificationService } from "../services/notification.service";
import { emitSocketNotification } from "../socket/notification.socket";
import { appEventEmitter } from "../emitter/emitter";
import { AnswerNotificationPayload, TransactionNotificationPayload } from "../types/notification.type";

appEventEmitter.on(
    "answer.created",
    async (data : AnswerNotificationPayload)=>{
        const notification = await createAnswerNotificationService(data);
        // console.log("sending this notification :", notification);
        emitSocketNotification(data.receiverId, notification, "answer");
    }
);

appEventEmitter.on(
    "payment.made",
    async (data : TransactionNotificationPayload)=>{
        const notification = await createTransactionNotificationService(data);
        emitSocketNotification(data.receiverId, notification, "payment");
    }
);