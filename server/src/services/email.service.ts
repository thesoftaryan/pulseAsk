import mailTransporter from "../config/mail.config";

export const sendVerificationMail = async (email: string, token: string)=>{
    const verificationURL = `${process.env.BACKEND_URL}/auth/verify-email?token=${token}`;

    await mailTransporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject : "Verify your email - PulseAsk",
        html: `
      <h2>Welcome to PulseAsk 👋</h2>
      <p>Please verify your email by clicking the link below:</p>
      <a href="${verificationURL}">Verify Email</a>
      <p>This link expires in 24 hours.</p>
    `,
    });
};