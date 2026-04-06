import { Router } from "express";
import { fetchMessagesController, getContactsController } from "../controllers/chat.controller";

const router = Router();

router.get("/contacts", getContactsController);

router.post("/fetchMessages", fetchMessagesController);

export default router;