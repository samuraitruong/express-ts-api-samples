import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";
export const get = (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello I am controller");
};
export const homeController = {
    get,
};