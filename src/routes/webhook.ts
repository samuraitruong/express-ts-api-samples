import { Request, Response, Router } from "express";
import { apiController } from "../controllers/api-controller";
import { paypalController } from "../controllers/paypal-controller";

const router: Router = Router();

router
    .route("/_webhooks/paypal")
    .post(paypalController.process)
    .get(paypalController.process);
export const webhookRoute: Router = router;