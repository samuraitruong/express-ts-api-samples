import {config} from "dotenv";
import {IConfig} from "../models/config";
config();

export const appConfigs: IConfig = {
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET,
    JWT_AUDIENCE: process.env.JWT_AUDIENCE,
    JWT_ENCRYPTION: process.env.JWT_ENCRYPTION,
    JWT_EXPIRATION: parseInt(process.env.JWT_EXPIRATION || "10000", 10),
    JWT_ISSUER: process.env.JWT_ISSUER,
    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
    MONGO_DB_CONNECTION_STRING: process.env.MONGO_DB_CONNECTION_STRING,
    OZSALE_ACCOUNT_ID: process.env.OZSALE_ACCOUNT_ID || "A816D792-E940-44F0-B752-06DE1ED5C2B9",
};
