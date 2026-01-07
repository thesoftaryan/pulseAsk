import mailTransporter from "../config/mail.config";

export const sendVerificationMail = async (email: string, token: string)=>{
    const verificationURL = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    await mailTransporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject : "Verify your email - PulseAsk",
        html: `<a href="${verificationURL}"> Verify Email </a>`,
    });
};