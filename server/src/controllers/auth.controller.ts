import {Request, Response} from "express"

export const registerController = async (req: Request, res: Response)=>{
    try{
        // Actual logic for registering
        console.log("Handling Register function with full energy");
        res.send("Handling Register function with full energy")
    }catch(error){
        // handling error
    }
}

export const loginController = async (req: Request, res: Response)=>{
    try{
        // Actual logic for login
        console.log("Handling Login function with full energy");
        res.send("Handling Login function with full energy");
    }catch(error){
        // handling login errors
    }
}