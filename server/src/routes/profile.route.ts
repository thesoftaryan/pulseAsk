import { Router } from "express";
import { fetchProfileController } from "../controllers/profile.controller";
import { validate } from "../middlewares/validation.middleware";
import { validateFetchProfile } from "../validations/profile.validation";

const router = Router();

router.post("/fetch", validate(validateFetchProfile), fetchProfileController);

export default router;