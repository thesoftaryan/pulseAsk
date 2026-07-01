import mailTransporter from "../config/mail.config";

/**
 * 
 * @param email of user to whom we will send mail.
 * @param token of email verification
 */
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
      <p>This link expires in 10 minutes.</p>
    `,
    });
};

/**
 * 
 * @param email of user to whom we will send mail.
 * @param token of reset password
 */
export const sendResetPasswordMail = async (email : string, token : string)=>{
  const resetPasswordURL = `${process.env.CLIENT_URL}/auth/reset-password?token=${token}`;
  await mailTransporter.sendMail({
    from : process.env.EMAIL_FROM,
    to : email,
    subject: "Reset Password - PulseAsk",
    html:`
      <h2>Reset Your Password</h2>
      <p> We have received your request for Password Reset</p>
      <p>Please reset your password by clicking the link below:</p>
      <a href="${resetPasswordURL}">Reset Password</a>
      <p>This link expires in 10 minutes.</p>
    `
  })
}