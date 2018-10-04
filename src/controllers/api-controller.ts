import { Request } from "express";
import { NextFunction, Response } from "express-serve-static-core";
import { OZSaleService } from "../services/ozsale-service";

export const getMenuList = async (req: Request, res: Response, next: NextFunction): Promise < any > => {
    const service = new OZSaleService();
    const data = await service.getMenuList();
    res.json(data);
};
export const getCategoryData = async (req: Request, res: Response, next: NextFunction): Promise < any > => {
    const service = new OZSaleService();
    const idProp = "id";
    const {category, limit, lastGroupType, lastGroupOffset} = req.query;
    const data = await service.getCategoryData(category, limit, lastGroupType, lastGroupOffset);
    res.json(data);
};
export const getSaleItems = async (req: Request, res: Response, next: NextFunction): Promise < any > => {
    const service = new OZSaleService();
    const {page, pageSize, filters, category, query, sort} = req.query;

    const data = await service.getSaleItems(page, pageSize, category, filters, query, sort);
    res.json(data);
};

export const getProductDetail = async (req: Request, res: Response, next: NextFunction): Promise < any > => {
    const service = new OZSaleService();
    const data = await service.getSaleProductDetail(req.params.productId);
    res.json(data);
};
export const getSalePublicDetails = async (req: Request, res: Response, next: NextFunction): Promise < any > => {
    const service = new OZSaleService();
    const data = await service.getSalePublicDetails(req.params.saleId);
    res.json(data);
};

export const getProductQuantity = async (req: Request, res: Response, next: NextFunction): Promise < any > => {
    const service = new OZSaleService();
    const data = await service.getSaleProductQuantity(req.params.saleId, req.params.productId);
    res.json(data);
};

export const getItemDataCategories = async (req: Request, res: Response, next: NextFunction): Promise < any > => {
    const service = new OZSaleService();
    const data = await service.getSaleItemCategories(req.params.saleId);
    res.json(data);
};
export const getFacets = async (req: Request, res: Response, next: NextFunction): Promise < any > => {
    const service = new OZSaleService();
    const data = await service.getFacets();
    res.json(data);
};
export const getSorting = async (req: Request, res: Response, next: NextFunction): Promise < any > => {
    const service = new OZSaleService();
    const data = await service.getSorting();
    res.json(data);
};

export const apiController = {
    getCategoryData,
    getSaleItems,
    getItemDataCategories,
    getMenuList,
    getProductDetail,
    getProductQuantity,
    getSalePublicDetails,
    getFacets,
    getSorting,
};