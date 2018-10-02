import {Router} from "express";
import * as passport from "passport";
import {cartController} from "../controllers/cart-controller";

const router : Router = Router();

router
    .route("/api/cart")
    .get(passport.authenticate("jwt", {session: false}), cartController.get)
    .post(passport.authenticate("jwt", {session: false}), cartController.post);

export const cartRoute : Router = router;