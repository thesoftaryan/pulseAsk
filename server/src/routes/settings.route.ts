import { Router } from "express";
import { addKTagController, removeKTagController, removeUserProfileImageController, updateBasicProfileController, updateChatProfileController, updateNotificationProfileController, updatePaymentProfileController, updateSocialProfileController, updateUserProfileImageController } from "../controllers/settings.controller";
import { validate } from "../middlewares/validation.middleware";
import { addKTagValidator, basicProfileValidator, removeKTagValidator, socialProfileValidator, updateUserProfileImageValidator } from "../validations/settings.validation";

const router = Router();

/* **************** Account Settings Route *************** */

router.post("/account/remove/image", removeUserProfileImageController);

router.post("/account/update/image", validate(updateUserProfileImageValidator),updateUserProfileImageController);

router.post("/account/update/basic", validate(basicProfileValidator), updateBasicProfileController);

router.post("/account/update/social", validate(socialProfileValidator),updateSocialProfileController);

router.post("/account/k-tag/add", validate(addKTagValidator),addKTagController);

router.post("/account/k-tag/remove", validate(removeKTagValidator),removeKTagController);


/* **************** Payment Settings Route *************** */
router.post("/payment/preferences", updatePaymentProfileController);

/* **************** Notification Settings Route *************** */
router.post("/notification/preferences", updateNotificationProfileController);

/* **************** Chat Settings Route *************** */
router.post("/chat/preferences", updateChatProfileController);


export default router;