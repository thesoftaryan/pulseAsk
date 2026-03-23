import { Router } from "express";
import { askQuestionController, fetchQuestionController, voteQuestionController } from "../controllers/question.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateAskQuestion, validateFetchQuestion } from "../validations/question.validation";
import { validateVote } from "../validations/vote.validation";


const router = Router();

router.post("/ask", validate(validateAskQuestion),askQuestionController);

router.post("/fetch", validate(validateFetchQuestion),fetchQuestionController);

router.post("/vote", validate(validateVote), voteQuestionController);
export default router;