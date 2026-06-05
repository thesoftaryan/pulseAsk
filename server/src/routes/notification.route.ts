import { Router } from "express";
import { fetchNotificationController } from "../controllers/notification.controller";

const router = Router();

router.get("/", fetchNotificationController);

export default router;