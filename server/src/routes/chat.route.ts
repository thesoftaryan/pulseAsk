import { Router } from "express";
import { fetchMessagesController, getContactsController, markAsSeenController, userContactDetailsController } from "../controllers/chat.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateFetchMessages, validateMarkAsSeen, validateUserContactDetails } from "../validations/chat.validation";

const router = Router();

router.get("/contacts", getContactsController);

router.post("/userContactDetails", validate(validateUserContactDetails), userContactDetailsController);

router.post("/fetchMessages", validate(validateFetchMessages), fetchMessagesController);

router.post("/markAsSeen", validate(validateMarkAsSeen), markAsSeenController);

export default router;