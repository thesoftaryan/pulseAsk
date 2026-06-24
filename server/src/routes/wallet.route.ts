import { Router } from "express";
import { getTransactionsController, getWalletStatsController, sendPaymentController } from "../controllers/wallet.controller";

const router = Router();

router.post("/send", sendPaymentController);

router.get("/getStats", getWalletStatsController);

router.get("/getTransactions", getTransactionsController);

export default router;