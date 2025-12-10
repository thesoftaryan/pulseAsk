import {Router} from "express";
import {registerController, loginController} from "../controllers/auth.controller";

// Router is modular, mountable route handler.
// Router instance is a complete middleware and routing system
const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;