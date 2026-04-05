import { Router } from "express";
import { getContactsController } from "../controllers/chat.controller";

const router = Router();

router.get("/contacts", getContactsController);

export default router;