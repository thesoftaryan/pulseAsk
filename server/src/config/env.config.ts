import dotenv from 'dotenv';

dotenv.config();

// if (!process.env.JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined");
// }
const requiredEnvVars = [
    "JWT_ACCESS_TOKEN_SECRET",
    "JWT_ACCESS_TOKEN_EXPIRES_IN",
    "JWT_REFRESH_TOKEN_SECRET",
    "JWT_REFRESH_TOKEN_EXPIRES_IN",
    "MONGO_URI",
];

for(const key of requiredEnvVars){
    if(!process.env[key]){
        throw new Error(`${key} is not defined`);
    }
}