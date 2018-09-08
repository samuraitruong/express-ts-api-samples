import { Request, Response, Router } from "express";
import { apiController } from "../controllers/api-controller";

const router: Router = Router();

router.get("/api/menu", apiController.getMenuList);
router.get("/api/category/:id", apiController.getCategoryData);
router.get("/api/item/:id", apiController.getItemData);
export const apiRoute: Router = router;