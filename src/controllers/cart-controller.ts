import {Request} from "express";
import {NextFunction, Response} from "express-serve-static-core";
import {response} from "../common/response";
import {ShoppingCartRepository} from "../repositories/shopping-cart-repository";
import {OZSaleService} from "../services/ozsale-service";
import {ShoppingCartService} from "../services/shopping-cart-service";

export const get = async (req: Request, res: Response, next: NextFunction): Promise < void > => {
    try {
        const repo = new ShoppingCartRepository(req.user);
        const service = new ShoppingCartService(repo, new OZSaleService());
        const result = await service.GetMyCart();
        response(res, null, result);
        return;
    } catch (err) {
        response(res, err, null);
    }
};
export const post = async (req: Request, res: Response, next: NextFunction): Promise < void > => {
    try {
        const repo = new ShoppingCartRepository(req.user);
        const service = new ShoppingCartService(repo, new OZSaleService());
        const result = await service.addItem(req.body);
        response(res, null, result);
    } catch (err) {
        response(res, err, null);
    }
};
export const cartController = {
    get,
    post,
};
