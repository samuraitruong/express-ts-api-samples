import { decode, sign, verify } from "jsonwebtoken";
import { LoginError } from "../common/errors";
import { appConfigs } from "../config/index";
import { IUser } from "../models";
import { IAuthenticateResult } from "../models/authenticate";
import { User } from "../models/user";

export async function authenticate(emailInput: string, password: string): Promise<IAuthenticateResult> {
    const user = await User.findOne({ email: emailInput });
    if (user) {
        if (!user.verifyPassword(password)) {
            throw new LoginError("Wrong email or password");
        }
        const { email, firstName, lastName } = user;
        const key = Buffer.from(appConfigs.JWT_ENCRYPTION, "base64").toString();
        const token = sign({
            aud: appConfigs.JWT_AUDIENCE,
            iss: appConfigs.JWT_ISSUER,
            sub: user._id,
        }, key, { expiresIn: appConfigs.JWT_EXPIRATION, algorithm: "RS256" });
        return { user: { email, firstName, lastName }, token };
    }
    return null;
}

export default {
    authenticate,
};
