import { Response } from "express-serve-static-core";
import { BaseError, EmailExistError } from "./errors";

export function response(res: Response, error: BaseError, data: any) {
    if (error) {
        console.log("error details", error);
        res.statusCode = error.errorCode || 500;
        // res.json(error);
        // return;
    }
    res.json(data || error);
}