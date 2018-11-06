import { NextFunction, Response } from "express-serve-static-core";
import { OZSaleService } from "../services/ozsale-service";
import { Request } from "express";
import { response } from "../common/response";
import { ShoppingCartRepository } from "../repositories/shopping-cart-repository";
import { ShoppingCartService } from "../services/shopping-cart-service";

export const get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

export const put = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const repo = new ShoppingCartRepository(req.user);
        const service = new ShoppingCartService(repo, new OZSaleService());
        const result = await service.updateItem(req.body);
        response(res, null, result);
        return;
    } catch (err) {
        response(res, err, null);
    }
};

export const post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const repo = new ShoppingCartRepository(req.user);
        const service = new ShoppingCartService(repo, new OZSaleService());
        const result = await service.addItem(req.body);
        const result1 = await service.GetMyCart();
        response(res, null, result1);
    } catch (err) {
        response(res, err, null);
    }
};

export const deleteFunc = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const repo = new ShoppingCartRepository(req.user);
        const service = new ShoppingCartService(repo, new OZSaleService());
        const result = await service.removeItem(req.params.itemId);

        response(res, null, result);
    } catch (err) {
        response(res, err, null);
    }
};

export const cartController = {
    deleteFunc,
    get,
    post,
    put,
};
