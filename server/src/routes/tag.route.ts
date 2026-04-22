import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { fetchQuestionsByTagController, fetchTagBySlugController, generateTagController } from "../controllers/tag.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateGenerateTag } from "../validations/tag.validation";

const router = Router();

router.post("/generate", validate(validateGenerateTag), generateTagController);

router.post("/fetchQuestions", fetchQuestionsByTagController);

router.post("/fetchTag", fetchTagBySlugController);

export default router;