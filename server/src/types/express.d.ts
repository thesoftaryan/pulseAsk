import "express-serve-static-core";
import { Types } from "mongoose";

declare module "express-serve-static-core" {
    interface Request {
        user? : {
            uid : Types.ObjectId;
            email : string;
        };
    }
}