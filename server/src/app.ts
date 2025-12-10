import express from "express";
import authRoutes from "./routes/auth.routes";

const app = express();

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
})

export default app;