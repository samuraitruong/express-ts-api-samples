import { PassportStatic } from "passport";
import * as  FacebookTokenStrategy from "passport-facebook-token";
import { appConfigs } from "../config";
import { User } from "../models";

export const facebookMiddleware = (passport: PassportStatic) => {
    const opts: FacebookTokenStrategy.StrategyOptionsWithRequest = {
        clientID: appConfigs.FACEBOOK_APP_ID,
        clientSecret: appConfigs.FACEBOOK_APP_SECRET,
        passReqToCallback: true,
    };

    passport.use(new FacebookTokenStrategy(opts, async (accessToken: any, refreshToken: any, profile: any,
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