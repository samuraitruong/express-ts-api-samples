import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";
import { IUser, User, UserSchema } from "../models/user";

export const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await User.create({
        email: "111",
        firstName: "!1",
        lastName: "123",
        password: "hello, 123456",
    });
    console.log("created");
    res.send("Hello I am User controller");
};
export const userController = {
    get,
};