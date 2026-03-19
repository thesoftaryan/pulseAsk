import { Router } from "express";
import { AskQuestionController } from "../controllers/question.controller";

const router = Router();

router.post("/ask", AskQuestionController);


export default router;