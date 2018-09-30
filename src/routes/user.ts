import { Request, Response, Router } from "express";
import * as passport from "passport";
import { userController } from "../controllers/user-controller";

const router: Router = Router();

router.route("/api/user")
    .get(passport.authenticate("jwt", { session: false }), userController.get)
    .post(userController.post);

export const userRoute: Router = router;