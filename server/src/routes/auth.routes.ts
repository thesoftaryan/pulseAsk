import {Router} from "express";
import {googleOAuthController, googleOAuthCallbackController, registerController, loginController, logoutController, emailVerificationController} from "../controllers/auth.controller";

// validation middleware
import { validate } from "../middlewares/validation.middleware";
import {validateLogin, validateRegister} from "../validations/auth.validation";

// Router is modular, mountable route handler.
// Router instance is a complete middleware and routing system
const router = Router();

router.get("/google", googleOAuthController);
router.get("/google/callback", googleOAuthCallbackController);

router.get("/verify-email", emailVerificationController);

router.post("/register",validate(validateRegister), registerController);
router.post("/login", validate(validateLogin), loginController);
router.post("/logout", logoutController);

export default router;