import { Router } from "express";
import { addKTagController, removeKTagController, updateBasicProfileController, updateSocialProfileController } from "../controllers/settings.controller";

const router = Router();

router.post("/account/update/basic", updateBasicProfileController);

router.post("/account/update/social", updateSocialProfileController);

router.post("/account/k-tag/add", addKTagController);

router.post("/account/k-tag/remove", removeKTagController);

export default router;