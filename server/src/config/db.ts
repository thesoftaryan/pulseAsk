import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Connected to MongoDB successfully!!")
    }catch(error){
        console.error("Can't Connect to Database : ", error);
        process.exit(1);
    }
}