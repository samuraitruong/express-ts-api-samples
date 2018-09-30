import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";
import { response } from "../common/response";
import { IUser, User, UserSchema } from "../models/user";
import { UserRepository } from "../repositories/user-repository";
import { authenticate } from "../services/authenticate-service";

export const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    response(res, null, req.user);
};
export const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const repo = new UserRepository();

        const user = await repo.createUser({
            ...req.body,
        });
        response(res, null, user);

    } catch (err) {
        response(res, err, null);
    }
};

export const userController = {
    get,
    post,
};