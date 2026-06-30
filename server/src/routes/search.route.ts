import { Router } from "express";
import { getPeopleSearchResultController, getQASearchResultController } from "../controllers/search.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateSearch } from "../validations/search.validation";

const router = Router();

router.post("/qa", validate(validateSearch), getQASearchResultController);
router.post("/people", validate(validateSearch), getPeopleSearchResultController);

export default router;