// config.ts
import dotenv from 'dotenv';
dotenv.config();

//Export vars
export const PORT = process.env.PORT;
export const SECRET_KEY = process.env.SECRET_JWT