import * as crypto from "crypto";
import * as moment from "moment";
import { Document, Model, model, Schema } from "mongoose";
export type UserStatus = 0 | 1 | 2;
// read more at - https://medium.com/@brianalois/build-node-mongo-rest-api-2018-jwt-eff0e4f41007
export interface IUser {
    userId: string;
    agreedTerm: boolean;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: number;
    password: string;
    updatedAt: number;
    status: UserStatus;
    salt: string;
    subcribedEmail: boolean;
    socialId?: string;
    socialType?: "facebook"|"google"|"instragram";
}

export interface IUserModel extends IUser, Document {
    fullName(): string;
    verifyPassword(password: string): boolean;
    getInfo(): Partial<IUser>;
}

export const UserSchema: Schema = new Schema({
    agreedTerm: {
        required: true,
        type: Boolean,
        validate: /true/,
    },
    createdAt: Number,
    email: {
        index: true,
        required: true,
        type: String,
        unique: true,
        validate: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
    firstName: String,
    lastName: String,
    password: String,
    salt: String,
    status: Number,
    subcribedEmail: Boolean,
    updatedAt: Number,
    socialId: String,
    socialType: String,
});
// tslint:disable-next-line:only-arrow-functions
UserSchema.pre<IUserModel>("save", function(next, documents) {
    this.createdAt = moment().utc().unix();
    this.updatedAt = moment().utc().unix();
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
// tslint:disable-next-line:only-arrow-functions
UserSchema.methods.verifyPassword = function(password: string) {
    password = crypto.pbkdf2Sync(password, this.salt, 10000, 64, "SHA512").toString("base64");
    return this.password === password;

};
UserSchema.methods.getInfo = function(): Partial<IUser> {
    const { subcribedEmail, email, firstName, lastName, createdAt, updatedAt, status , socialId} = this;
    const user = { subcribedEmail, email, firstName,
        lastName, createdAt, updatedAt, status, socialId, userId: this._id};
    return user;
};
UserSchema.methods.hashPassword = (password: string) => {
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64, "SHA512").toString("base64");
};
export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);