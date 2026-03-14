import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { GenerateTagController } from "../controllers/tag.controller";

const router = Router();

router.get("/tags/generate-tag", authMiddleware, GenerateTagController);

export default router;