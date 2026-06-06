import { Router } from "express";
import { fetchNotificationController, markNotificationAsSeenController } from "../controllers/notification.controller";

const router = Router();

router.get("/", fetchNotificationController);

router.post("/markAsSeen", markNotificationAsSeenController);

export default router;