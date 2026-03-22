import { Router } from "express";
import { answerController } from "../controllers/answer.controller";

const router = Router();

router.post("/vote", answerController);