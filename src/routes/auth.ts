import { Request, Response, Router } from "express";
import * as passport from "passport";
import { authController } from "../controllers/auth-controller";

const router: Router = Router();

router.route("/auth/login")
    .post(authController.login);

router.route("/auth/facebook")
    .get(passport.authenticate("facebook-token"), authController.facebook);
export const authRoute: Router = router;