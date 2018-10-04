import { Request, Response, Router } from "express";
import { apiController } from "../controllers/api-controller";

const router: Router = Router();

router.get("/api/menu", apiController.getMenuList);
router.get("/api/category/", apiController.getCategoryData);
router.get("/api/saleItems", apiController.getSaleItems);
router.get("/api/saleItem/:saleId/categories", apiController.getItemDataCategories);
router.get("/api/saleItem/:saleId/publicInfo", apiController.getSalePublicDetails);
router.get("/api/product/:productId", apiController.getProductDetail);
router.get("/api/product/:saleId/:productId/quantity", apiController.getProductQuantity);
router.get("/api/shop/facets", apiController.getFacets);
router.get("/api/shop/sorting", apiController.getSorting);
export const apiRoute: Router = router;