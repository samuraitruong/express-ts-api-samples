import { PassportStatic } from "passport";
import {Strategy , StrategyOptionWithRequest} from "passport-facebook";
import { appConfigs } from "../config";
import { User } from "../models";

export const facebookMiddleware = (passport: PassportStatic) => {
    const opts: StrategyOptionWithRequest = {
        clientID: appConfigs.FACEBOOK_APP_ID,
        callbackURL: "http://localhost:5000/auth/facebook/callback/",
        clientSecret: appConfigs.FACEBOOK_APP_SECRET,
        passReqToCallback: true,
    };

    passport.use(new Strategy(opts, async (accessToken: any, refreshToken: any, profile: any,
                                           done: (err: any, data: any) => void) => {
        let user;
        console.log("facebook", accessToken);
        user = await User.findById(profile.id);
        if (user) {
            return done(null, user.getInfo());
        } else {
            return done(null, false);
        }
    }));
};