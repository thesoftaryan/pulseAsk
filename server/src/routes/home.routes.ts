import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { HomeController } from "../controllers/home.controller";


const router = Router();

router.get("/", authMiddleware, HomeController);

export default router;