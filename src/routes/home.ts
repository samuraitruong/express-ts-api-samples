import { Request, Response, Router } from "express";
import { homeController } from "../controllers/home-controller";

const router: Router = Router();

router.get("/", homeController.get);

router.get("/:name", homeController.get);

export const homeRoute: Router = router;