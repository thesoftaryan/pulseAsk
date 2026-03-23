import { Router } from "express";
import { fetchAnswersController, postAnswerController, voteAnswerController } from "../controllers/answer.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateVote } from "../validations/vote.validation";

const router = Router();

router.post("/vote", validate(validateVote),voteAnswerController);

router.post("/post", postAnswerController);

router.post("/fetch", fetchAnswersController);

export default router;