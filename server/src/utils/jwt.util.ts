import jwt, {Secret, SignOptions} from "jsonwebtoken";

const JWT_ACCESS_TOKEN_SECRET : Secret = process.env.JWT_ACCESS_TOKEN_SECRET! as string;
const JWT_ACCESS_TOKEN_EXPIRES_IN : SignOptions["expiresIn"] = process.env.JWT_ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"]|| "15m";

const JWT_REFRESH_TOKEN_SECRET : Secret = process.env.JWT_REFRESH_TOKEN_SECRET! as string;
const JWT_REFRESH_TOKEN_EXPIRES_IN : SignOptions["expiresIn"] = process.env.JWT_REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"]|| "30d";

export const signToken = (payload : object, type : "access" | "refresh")=>{
    return jwt.sign(payload, (type==="access")? JWT_ACCESS_TOKEN_SECRET:JWT_REFRESH_TOKEN_SECRET, {
        expiresIn : (type==="access")? JWT_ACCESS_TOKEN_EXPIRES_IN:JWT_REFRESH_TOKEN_EXPIRES_IN,
    });
};

export const verifyToken = (token : string, type : "access" | "refresh")=>{
    return jwt.verify(token, (type==="access")? JWT_ACCESS_TOKEN_SECRET : JWT_REFRESH_TOKEN_SECRET);
}