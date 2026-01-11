import './config/env.config';
import { connectDB } from "./config/db.config";
import app from "./app";

const PORT = process.env.PORT || 2903;

connectDB()
.then(()=>{
    console.log("Database Connected Successfully!");

    app.listen(PORT, ()=>{
        console.log(`Server running on port ${PORT}`);
    });

    // Shutdown on unexpected errors
    process.on("uncaughtException", (error)=>{
        console.log("Uncaught Exception encountered, shutting down...\n", error);
        process.exit(1);
    });

    process.on("unhandledRejection", (error)=>{
        console.log("Unhandled Rejection encountered, shutting down...\n", error);
        process.exit(1);
    });
})
.catch((error)=>{
    console.error("Error connecting to Database!");
    console.error(error);
    process.exit(1);
})