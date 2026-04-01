import { Router } from "express";
import { addKTagController, removeKTagController, removeUserProfileImageController, updateBasicProfileController, updateSocialProfileController, updateUserProfileImageController } from "../controllers/settings.controller";
import { validate } from "../middlewares/validation.middleware";
import { addKTagValidator, basicProfileValidator, removeKTagValidator, socialProfileValidator, updateUserProfileImageValidator } from "../validations/settings.validation";

const router = Router();

router.post("/account/remove/image", removeUserProfileImageController);

router.post("/account/update/image", validate(updateUserProfileImageValidator),updateUserProfileImageController);

router.post("/account/update/basic", validate(basicProfileValidator), updateBasicProfileController);

router.post("/account/update/social", validate(socialProfileValidator),updateSocialProfileController);

router.post("/account/k-tag/add", validate(addKTagValidator),addKTagController);

router.post("/account/k-tag/remove", validate(removeKTagValidator),removeKTagController);

export default router;