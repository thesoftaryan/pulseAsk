import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))

// To make our app able to parse JSON request format
app.use(express.json());

// Check
app.get("/", (req, res)=>{
    res.send("PulseAsk's backend pulse is perfectly fine!");
});

// ********** Auth Route *********** \\
app.use("/auth", authRoutes);


app.use((req, res)=>{
    res.status(404).json({message:"Route not Found"});
});

export default app;