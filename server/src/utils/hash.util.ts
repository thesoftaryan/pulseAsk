import crypto from "crypto";

export const generateHash = (rawData : string)=>{
    const hashedValue = crypto
    .createHash("sha256")
    .update(rawData)
    .digest("hex");
    
    return hashedValue;
}