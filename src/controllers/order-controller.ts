import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";
import { response } from "../common/response";
import { ShoppingCartRepository } from "../repositories/shopping-cart-repository";
import { OrderService } from "../services/order-service";

export const createOrder = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    const repo = new ShoppingCartRepository(req.user);
    const service = new OrderService(repo);
    const result = await service.convertShoppingCartToOrder();
    response(res, null, {
        status: "OK", result,
    });
};

export const orderController = {
    createOrder,
};