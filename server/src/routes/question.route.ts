import { Router } from "express";
import { askQuestionController, fetchQuestionController } from "../controllers/question.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateAskQuestion, validateFetchQuestion } from "../validations/question.validation";
import { voteController } from "../controllers/vote.controller";

const router = Router();

router.post("/ask", validate(validateAskQuestion),askQuestionController);

router.post("/fetch", validate(validateFetchQuestion),fetchQuestionController);

router.post("/vote", voteController);
export default router;