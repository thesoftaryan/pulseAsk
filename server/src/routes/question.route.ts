import { Router } from "express";
import { askQuestionController, fetchQuestionController, questionVoteController } from "../controllers/question.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateAskQuestion, validateFetchQuestion } from "../validations/question.validation";


const router = Router();

router.post("/ask", validate(validateAskQuestion),askQuestionController);

router.post("/fetch", validate(validateFetchQuestion),fetchQuestionController);

router.post("/vote", questionVoteController);
export default router;