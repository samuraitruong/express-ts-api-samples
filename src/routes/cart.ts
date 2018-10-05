import { Router } from "express";
import * as passport from "passport";
import { cartController } from "../controllers/cart-controller";

const router: Router = Router();

router
    .route("/api/cart")
    .get(passport.authenticate("jwt", {session: false}), cartController.get)
    .post(passport.authenticate("jwt", {session: false}), cartController.post)
    .put(passport.authenticate("jwt", {session: false}), cartController.put);

router
    .route("/api/cart/:itemId")
    .delete(passport.authenticate("jwt", {session: false}), cartController.deleteFunc);
export const cartRoute: Router = router;