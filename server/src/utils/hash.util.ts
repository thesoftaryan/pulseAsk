import crypto from "crypto";

export const generateHash = (rawData : string, nonce : string = "")=>{
    const hashedValue = crypto
    .createHash("sha256")
    .update(rawData)
    .update(nonce)
    .digest("hex");
    
    return hashedValue;
}