import { Request, Response, Router } from "express";
import { apiController } from "../controllers/api-controller";

const router: Router = Router();

router.get("/api/menu", apiController.getMenuList);
router.get("/api/category/:id", apiController.getCategoryData);
router.get("/api/saleItem/:id", apiController.getItemData);
router.get("/api/saleItem/:saleId/categories", apiController.getItemDataCategories);
router.get("/api/saleItem/:saleId/sold", apiController.getSoldOutItem);
router.get("/api/saleItem/:saleId/publicInfo", apiController.getSalePublicDetails);
router.get("/api/product/:saleId/:productId", apiController.getProductDetail);
router.get("/api/product/:saleId/:productId/quantity", apiController.getProductQuantity);
export const apiRoute: Router = router;