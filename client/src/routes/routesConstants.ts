export const authRoutes = {
    login : "/auth/login",
    register : "/auth/register",

    forgotPassword : "/auth/forgot-password",
    resetPassword : "/auth/reset-password",

    verifyEmail : "/auth/verify-email",
}

export const homeRoutes = {
    home : "/home",
    tag: "/tag",
    chat: "/chat",
    // requires /question/:qid/:slug
    question: "/question",
    askQuestion: "/question/ask",
    search: "/search",
    // requires /profile/:userName
    profile: "/profile",
    settings: "/settings"
}