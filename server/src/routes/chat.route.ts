import { Router } from "express";
import { fetchMessagesController, getContactsController, userContactDetailsController } from "../controllers/chat.controller";

const router = Router();

router.get("/contacts", getContactsController);

router.post("/userContactDetails", userContactDetailsController);

router.post("/fetchMessages", fetchMessagesController);

export default router;