import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";
import { OZSaleService } from "../services/ozsale-service";

export const getMenuList = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const service = new OZSaleService();
    const data = await service.getMenuList();
    res.json(data);
};
export const getCategoryData = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const service = new OZSaleService();
    const idProp = "id";
    const data = await service.getCategoryData(req.params.id);
    res.json(data);
};
export const getItemData = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const service = new OZSaleService();
    const idProp = "id";
    const data = await service.getSaleItem(req.params.id);
    res.json(data);
};

export const apiController = {
    getMenuList,
    getCategoryData,
    getItemData,
};