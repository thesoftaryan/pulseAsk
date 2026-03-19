import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { generateTagController } from "../controllers/tag.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateGenerateTag } from "../validations/tag.validation";

const router = Router();

router.post("/generate", validate(validateGenerateTag), generateTagController);

export default router;