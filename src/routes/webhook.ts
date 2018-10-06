import { apiController } from "../controllers/api-controller";
import { paypalController } from "../controllers/paypal-controller";
import { Request, Response, Router } from "express";

const router: Router = Router();

router
    .route("/_webhooks/paypal")
    .post(paypalController.process)
    .get(paypalController.process);
export const webhookRoute : Router = router;