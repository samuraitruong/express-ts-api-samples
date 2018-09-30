import { IUser } from "./user";

export interface IAuthenticateResult {
    user: Partial<IUser>;
    token: string;
}