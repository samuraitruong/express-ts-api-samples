import { Request, Response, Router } from "express";
import { userController } from "../controllers/user-controller";

const router: Router = Router();

router.get("/api/user", userController.get);
export const userRoute: Router = router;