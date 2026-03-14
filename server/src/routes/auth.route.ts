import {Router} from "express";
import {googleOAuthController, 
    googleOAuthCallbackController, 
    registerController, 
    loginController, 
    logoutController, 
    emailVerificationController, 
    forgotPasswordController, 
    resetPasswordController, 
    resendEmailVerificationLinkController, 
    refreshTokenController,
    meController} from "../controllers/auth.controller";

// validation middleware
import { validate } from "../middlewares/validation.middleware";
import {validateForgotPassword, validateLogin, validateRegister, validateResetPassword, validateVerifyEmail} from "../validations/auth.validation";
import { authMiddleware } from "../middlewares/auth.middleware";


// Router is modular, mountable route handler.
// Router instance is a complete middleware and routing system
const router = Router();

router.get("/google", googleOAuthController);
router.get("/google/callback", googleOAuthCallbackController);

router.get("/me", authMiddleware, meController);

router.get("/verify-email", emailVerificationController);
router.post("/resend-verification-email", validate(validateVerifyEmail), resendEmailVerificationLinkController);

router.post("/refresh-token", refreshTokenController);

router.post("/register",validate(validateRegister), registerController);
router.post("/login", validate(validateLogin), loginController);
router.post("/logout", logoutController);

router.post("/forgot-password", validate(validateForgotPassword), forgotPasswordController);
router.post("/reset-password", validate(validateResetPassword), resetPasswordController);

export default router;