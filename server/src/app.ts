import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import homeRoutes from "./routes/home.route";
import authRoutes from "./routes/auth.route";
import profileRoutes from "./routes/profile.route";
import questionRoute from "./routes/question.route";
import answerRoute from "./routes/answer.route";
import tagRoutes from "./routes/tag.route";
import settingsRoute from "./routes/settings.route";
import chatRoute from "./routes/chat.route";
import generalRoutes from "./routes/general.route";
import { errorMiddleware } from "./middlewares/error.middleware";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();

// Middlewares
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// To make our app able to parse JSON request format
app.use(express.json());

// To make our app able to parse the sent cookies
app.use(cookieParser());


// Check
app.get("/", (req, res)=>{
    res.send("PulseAsk's backend pulse is perfectly fine!");
});


// ********** Auth Route *********** \\
app.use("/auth", authRoutes);

// ********** Home Route *********** \\
app.use("/home", authMiddleware, homeRoutes);

// ********** Profile Route *********** \\
app.use("/profile", authMiddleware, profileRoutes);

// ********** Question Route *********** \\
app.use("/question", authMiddleware, questionRoute);

// ********** Answer Route *********** \\
app.use("/answer", authMiddleware, answerRoute);

// ********** Tag Route *********** \\
app.use("/tag", authMiddleware, tagRoutes);

// ********** Settings Route *********** \\
app.use("/settings", authMiddleware, settingsRoute);

// ********** Chat Route *********** \\
app.use("/chat", authMiddleware, chatRoute);

// ********** General Routes *********** \\
app.use("/", authMiddleware, generalRoutes);

app.use((req, res)=>{
    res.status(404).json({message:"Route not Found"});
});

app.use(errorMiddleware);

export default app;