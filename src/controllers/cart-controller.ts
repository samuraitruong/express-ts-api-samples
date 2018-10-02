
import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";
import { response } from "../common/response";

export const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        response(res, null, { result: "ok" });
        return;
    } catch (err) {
        response(res, err, null);
    }
};
export const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        response(res, null, { result: "post OK" });
    } catch (err) {
        response(res, err, null);
    }
};
export const cartController = {
    get,
    post,
};
