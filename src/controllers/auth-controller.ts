import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";
import { RequestValidationError } from "../common/errors";
import { response } from "../common/response";
import { IUser, User, UserSchema } from "../models/user";
import { UserRepository } from "../repositories/user-repository";
import { authenticate } from "../services/authenticate-service";

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return response(res, new RequestValidationError("Bad input"), { email, password });
        }
        const result = await authenticate(email, password);
        return response(res, null, result);
    } catch (err) {
        response(res, err, null);
    }
};
export const facebook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        res.json(req.user);
        return;
    } catch (err) {
        response(res, err, null);
    }
};
export const authController = {
    facebook,
    login,
};
