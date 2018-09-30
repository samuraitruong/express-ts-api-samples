import { PassportStatic } from "passport";
import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { appConfigs } from "../config";
import { User } from "../models";

export const jwtMiddleware = (passport: PassportStatic) => {
    const opts: StrategyOptions = {
        algorithms: ["RS256"],
        audience: appConfigs.JWT_AUDIENCE,
        issuer: appConfigs.JWT_ISSUER,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: Buffer.from(appConfigs.JWT_PUBLIC_KEY, "base64").toString(),
    };

    passport.use(new Strategy(opts, async (payload: any, done) => {
        let user;
        user = await User.findById(payload.sub);
        if (user) {
            return done(null, user.getInfo());
        } else {
            return done(null, false);
        }
    }));
};