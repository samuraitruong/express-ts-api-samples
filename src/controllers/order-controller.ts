import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";
import { response } from "../common/response";

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise < any > => {
    response(res, null, {
        status: "OK",
    });
};

export const orderController = {
    createOrder,
};