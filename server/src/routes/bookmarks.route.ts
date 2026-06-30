
import { Router } from "express";
import { addBookmarkController, fetchBookmarkedAnswersController, fetchBookmarkedQuestionsController, isBookmarkedController, removeBookmarkController } from "../controllers/bookmarks.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateBookmark } from "../validations/bookmark.validation";

const router = Router();

router.post("/add", validate(validateBookmark), addBookmarkController);
router.post("/remove", validate(validateBookmark), removeBookmarkController);
router.post("/check", validate(validateBookmark), isBookmarkedController);

router.get("/answers", fetchBookmarkedAnswersController);
router.get("/questions", fetchBookmarkedQuestionsController);

export default router;