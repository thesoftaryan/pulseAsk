import { Router } from "express";
import { fetchMessagesController, getContactsController, markAsSeenController, userContactDetailsController } from "../controllers/chat.controller";

const router = Router();

router.get("/contacts", getContactsController);

router.post("/userContactDetails", userContactDetailsController);

router.post("/fetchMessages", fetchMessagesController);

router.post("/markAsSeen", markAsSeenController);

export default router;