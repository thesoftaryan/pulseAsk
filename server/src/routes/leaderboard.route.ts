import { Router } from "express";
import { getLeaderboardController } from "../controllers/leaderboard.controller";

const router = Router();

router.get("getLeaderboard", getLeaderboardController);

export default router;