import { Router } from "express";
import { fetchProfileController, updateBasicProfileController, updateSocialProfileController } from "../controllers/profile.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateFetchProfile } from "../validations/profile.validation";

const router = Router();

router.post("/fetch", validate(validateFetchProfile), fetchProfileController);

router.post("/update/basic", updateBasicProfileController);

router.post("/update/social", updateSocialProfileController);

export default router;