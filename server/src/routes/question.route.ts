import { Router } from "express";
import { AskQuestionController } from "../controllers/question.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateAskQuestion } from "../validations/question.validation";

const router = Router();

router.post("/ask", validate(validateAskQuestion),AskQuestionController);


export default router;