import { Request } from "express-serve-static-core";
import { PassportStatic } from "passport";
import * as FacebookTokenStrategy from "passport-facebook-token";
import { appConfigs } from "../config";
import { User } from "../models";
import { authenticate, facebookAuthenticate } from "../services/authenticate-service";
import { IFacebookResult } from "../models/facebook";

export const facebookMiddleware = (passport: PassportStatic) => {
    const opts: FacebookTokenStrategy.StrategyOptionsWithRequest = {
        clientID: appConfigs.FACEBOOK_APP_ID,
        // callbackURL: "http://localhost:5000/auth/facebook/callback/",
        clientSecret: appConfigs.FACEBOOK_APP_SECRET,
        enableProof: false,
        passReqToCallback: true,
    };

    passport.use(new FacebookTokenStrategy(opts, async (req: Request, accessToken: any, refreshToken: any,
        profile: IFacebookResult, done: (err: any, data: any) => void) => {
        let user;
        
        console.log("facebook", profile._json);

        user = await facebookAuthenticate(profile._json);
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    }));
};