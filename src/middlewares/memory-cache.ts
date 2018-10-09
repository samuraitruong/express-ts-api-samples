import { NextFunction, Request, Response } from "express-serve-static-core";
import * as NodeCache from "node-cache";
const memCache = new NodeCache({ stdTTL: 300 });

export function cacheMiddleware(duration: number) {
    return (req: Request, res: Response, next: NextFunction) => {
        const key = "__express__" + req.originalUrl || req.url;
        const cacheContent = memCache.get(key);
        if (cacheContent) {
            res.send(cacheContent);
            return;
        } else {
            const sendResponse = res.send.bind(res);
            res.send = (body): Response => {
                memCache.set(key, body, duration * 1000);
                sendResponse(body);
                return res;
            };
            next();
        }
    };
}