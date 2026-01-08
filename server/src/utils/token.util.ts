import crypto from "crypto";
import { generateHash } from "./hash.util";

export const generateRandomToken = ()=>{
    const rawToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = generateHash(rawToken);

    return {rawToken, hashedToken,};
}