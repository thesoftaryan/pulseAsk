import { Request, Response } from "express"
import { sendPaymentService } from "../services/payment.service";
import { successResponse } from "../utils/response.util";
import { STATUS } from "../constants/statusCodes.constants";
export const sendPaymentController = async (req: Request, res:Response)=>{
    const data = req.body;
    await sendPaymentService(req.user?.uid!, data);
    return successResponse(
        res,
        STATUS.SUCCESS.OK,
        "Payment sent",
        {},
    );
}