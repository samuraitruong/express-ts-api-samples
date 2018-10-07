import { Router } from "express";
import * as passport from "passport";
import { orderController } from "../controllers/order-controller";

const router: Router = Router();

router
    .route("/api/order")
    // .get(passport.authenticate("jwt", {session: false}), orderController.get)
    .post(passport.authenticate("jwt", { session: false }), orderController.createOrder);
// .put(passport.authenticate("jwt", {session: false}), cartController.put);

export const orderRoute: Router = router;