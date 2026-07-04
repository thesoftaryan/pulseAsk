import { ApiError } from "../utils/error.util";
import { STATUS } from "../constants/statusCodes.constants";


interface SendMailOptions {
    to: string;
    subject: string;
    html: string;
}

export const sendMail = async ({
    to,
    subject,
    html,
}: SendMailOptions) => {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": process.env.BREVO_API_KEY!,
        },
        body: JSON.stringify({
            sender: {
                email: process.env.EMAIL_FROM,
                name: "PulseAsk",
            },
            to: [
                {
                    email: to,
                },
            ],
            subject,
            htmlContent: html,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new ApiError(
            STATUS.SERVER_ERROR.BAD_GATEWAY,
            `Brevo API Error (${response.status}): ${error}`
        );
    }
}