import { MongoError } from "mongodb";
import { EmailExistError, InternalError, RequestValidationError } from "../common/errors";
import { IUser, User } from "../models";

export class UserRepository {
    constructor() {
        // console.log("UserRepository");
    }
    public async createUser(source: Partial<IUser>): Promise<Partial<IUser>> {
        try {
            const user = await User.create(source);
            return user.getInfo();
        } catch (error) {
            console.log("Err", error, typeof (error));
            if (error as MongoError) {
                const mongoError = error as MongoError;
                switch (mongoError.code) {
                    case 11000:
                        throw new EmailExistError();
                }
            }
            if (error && error.name === "ValidationError") {
                throw new RequestValidationError(error);
            }
            throw new InternalError(error);
        }
    }
}