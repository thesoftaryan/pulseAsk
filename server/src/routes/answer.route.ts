import { Router } from "express";
import { fetchAnswerCommentsController, fetchAnswersController, postAnswerCommentController, postAnswerController, voteAnswerController } from "../controllers/answer.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateVote } from "../validations/vote.validation";
import { validateFetchAnswers, validatePostAnswer } from "../validations/answer.validation";
import { validateFetchComments, validatePostComment } from "../validations/comment.validation";

const router = Router();

router.post("/vote", validate(validateVote),voteAnswerController);

router.post("/post", validate(validatePostAnswer), postAnswerController);

router.post("/fetchMany", validate(validateFetchAnswers),fetchAnswersController);

router.post("/comment/fetchMany", validate(validateFetchComments),fetchAnswerCommentsController);

router.post("/comment/post", validate(validatePostComment), postAnswerCommentController);

export default router;