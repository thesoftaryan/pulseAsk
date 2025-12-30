import {Router} from "express";
import {registerController, loginController} from "../controllers/auth.controller";

// validation middleware
import { validate } from "../middlewares/validation.middleware";
import {validateLogin, validateRegister} from "../validations/auth.validation";

// Router is modular, mountable route handler.
// Router instance is a complete middleware and routing system
const router = Router();

router.post("/register", validate(validateRegister), registerController);
router.post("/login", validate(validateLogin), loginController);

export default router;