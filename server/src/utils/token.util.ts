import crypto from "crypto";
import { generateHash } from "./hash.util";

export const generateRandomToken = (nonce? : string)=>{
    const rawToken = crypto.randomBytes(32).toString("hex");

    const hashedToken = generateHash(rawToken, nonce);

    return {rawToken, hashedToken,};
}