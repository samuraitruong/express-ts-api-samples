import { Request } from "express-serve-static-core";
import { PassportStatic } from "passport";
import * as FacebookTokenStrategy from "passport-facebook-token";
import { appConfigs } from "../config";
import { User } from "../models";
import { IFacebookResult } from "../models/facebook";
import { authenticate, facebookAuthenticate } from "../services/authenticate-service";

export const facebookMiddleware = (passport: PassportStatic) => {
    const opts: FacebookTokenStrategy.StrategyOptionsWithRequest = {
        clientID: appConfigs.FACEBOOK_APP_ID,
        // callbackURL: "http://localhost:5000/auth/facebook/callback/",
        clientSecret: appConfigs.FACEBOOK_APP_SECRET,
        enableProof: false,
        passReqToCallback: true,
    };

    passport.use(new FacebookTokenStrategy(opts, async (req: Request, accessToken: any, refreshToken: any,
                                                        profile: FacebookTokenStrategy.Profile, done: (err: any, data: any) => void) => {
        let authResult = await facebookAuthenticate(profile._json);
        if (authResult) {
            return done(null, authResult);
        } else {
            return done(null, false);
        }
    }));
};