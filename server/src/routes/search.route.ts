import { Router } from "express";
import { getPeopleSearchResultController, getQASearchResultController } from "../controllers/search.controller";

const router = Router();

router.post("/qa", getQASearchResultController);
router.post("/people", getPeopleSearchResultController);

export default router;