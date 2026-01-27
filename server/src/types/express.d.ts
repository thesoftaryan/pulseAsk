import "express-serve-static-core";
import { Types } from "mongoose";
import { TokenData } from "./auth.types";

declare module "express-serve-static-core" {
    interface Request {
        user? : TokenData;
    }
}