import { Router } from "express";
import { sendPaymentController } from "../controllers/payment.controller";

const router = Router();

router.post("/send", sendPaymentController);

export default router;