import dotenv from 'dotenv';

dotenv.config();

// if (!process.env.JWT_SECRET) {
//   throw new Error("JWT_SECRET is not defined");
// }
const requiredEnvVars = [
    "JWT_SECRET",
    "JWT_EXPIRES_IN",
    "MONGO_URI",
];

for(const key of requiredEnvVars){
    if(!process.env[key]){
        throw new Error(`${key} is not defined`);
    }
}