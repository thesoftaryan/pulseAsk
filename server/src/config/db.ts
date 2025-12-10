import mongoose from "mongoose";

export const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI!);
    }catch(error){
        console.error("Can't Connect to Database : ", error);
        process.exit(1);
    }
}