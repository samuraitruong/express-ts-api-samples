export interface IConfig {
    FACEBOOK_APP_SECRET: string;
    FACEBOOK_APP_ID: string;
    MONGO_DB_CONNECTION_STRING: string;
    JWT_PUBLIC_KEY: string;
    JWT_ENCRYPTION: string;
    JWT_EXPIRATION: number;
    JWT_AUDIENCE: string;
    JWT_ISSUER: string;
    OZSALE_ACCOUNT_ID: string;
}