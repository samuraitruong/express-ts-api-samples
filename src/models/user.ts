import * as crypto from "crypto";
import * as moment from "moment";
import { Document, Model, model, Schema } from "mongoose";
import { isString } from "util";
export type UserStatus = 0 | 1 | 2;
export interface IUser {
    fistName: string;
    lastName: string;
    email: string;
    createdAt: number;
    password: string;
    updatedAt: number;
    status: UserStatus;
    salt: string;
}

export interface IUserModel extends IUser, Document {
    fullName(): string;
}

export const UserSchema: Schema = new Schema({
    createdAt: Number,
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    salt: String,
    status: Number,
    updatedAt: Number,
});
// tslint:disable-next-line:only-arrow-functions
UserSchema.pre<IUserModel>("save", function(next, documents) {
    this.createdAt = moment().utc().unix();
    this.updatedAt = moment().utc().unix();
    console.log("on pre save call", this);
    if (this.password) {
        // generate salt
        this.salt = crypto.randomBytes(32).toString("base64");
        // this.password = this.hashPassword()
        this.password = crypto.pbkdf2Sync(this.password, this.salt, 10000, 64, "SHA512").toString("base64");
    }
    next();
});
UserSchema.methods.fullName = (): string => {
    return (this.firstName.trim() + " " + this.lastName.trim());
};
UserSchema.methods.hashPassword = (password: string) => {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, "SHA512").toString("base64");
};
export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);