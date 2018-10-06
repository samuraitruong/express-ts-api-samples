import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";
import { response } from "../common/response";
import { OZSaleService } from "../services/ozsale-service";

export const process = async (req: Request, res: Response, next: NextFunction): Promise < any > => {
    response(res, null, {success: true});
};

export const paypalController = {
    process,​​
};