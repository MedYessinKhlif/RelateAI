import dotenv from 'dotenv';
dotenv.config();

export default {
    jwtSecret: process.env.JWT_SECRET,
    googleApiKey: process.env.GOOGLE_API_KEY,
};