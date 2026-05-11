
import { Router } from "express";
import { addBookmarkController, fetchBookmarkedAnswersController, fetchBookmarkedQuestionsController, isBookmarkedController, removeBookmarkController } from "../controllers/bookmarks.controller";

const router = Router();

router.post("/add", addBookmarkController);
router.post("/remove", removeBookmarkController);
router.post("/check", isBookmarkedController);

router.get("/answers", fetchBookmarkedAnswersController);
router.get("/questions", fetchBookmarkedQuestionsController);

export default router;