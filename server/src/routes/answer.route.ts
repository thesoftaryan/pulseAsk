import { Router } from "express";
import { fetchAnswerCommentsController, fetchAnswersController, postAnswerCommentController, postAnswerController, voteAnswerController } from "../controllers/answer.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateVote } from "../validations/vote.validation";

const router = Router();

router.post("/vote", validate(validateVote),voteAnswerController);

router.post("/post", postAnswerController);

router.post("/fetch", fetchAnswersController);

router.post("/comment/fetch", fetchAnswerCommentsController);

router.post("/comment/post", postAnswerCommentController);

export default router;