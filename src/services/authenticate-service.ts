import { appConfigs } from "../config/index";
import { decode, sign, verify } from "jsonwebtoken";
import { IAuthenticateResult } from "../models/authenticate";
import { IFacebookProfile } from "../models/facebook";
import { IUser } from "../models";
import { LoginError } from "../common/errors";
import { User } from "../models/user";
import { UserRepository } from "../repositories/user-repository";

export async function authenticate(emailInput: string, password: string): Promise < IAuthenticateResult > {
    const user = await User.findOne({email: emailInput});
    if (user) {
        if (!user.verifyPassword(password)) {
            throw new LoginError("Wrong email or password");
        }
        const {email, firstName, lastName} = user;
        const key = Buffer
            .from(appConfigs.JWT_ENCRYPTION, "base64")
            .toString();
        const token = sign({
            aud: appConfigs.JWT_AUDIENCE,
            iss: appConfigs.JWT_ISSUER,
            sub: user._id,
        }, key, {
            expiresIn: appConfigs.JWT_EXPIRATION,
            algorithm: "RS256",
        });
        return {
            user: {
                email,
                firstName,
                lastName,
            },
            token,
        };
    }
    throw new LoginError("Wrong email or password");
}

export async function facebookAuthenticate(facebookProfile: IFacebookProfile): Promise < IAuthenticateResult > {
    let user = await User.findOne({socialId: facebookProfile.id});
    if (!user) {
        // create new user
        const repository = new UserRepository();
        const fbUser = await repository.createUser({
            agreedTerm: true,
            email: facebookProfile.email,
            firstName: facebookProfile.first_name,
            lastName: facebookProfile.last_name,
            socialId: facebookProfile.id,
            socialType: "facebook",
            subcribedEmail: true,
        });
    }
    user = await User.findOne({socialId: facebookProfile.id});

    const key = Buffer
        .from(appConfigs.JWT_ENCRYPTION, "base64")
        .toString();
    const token = sign({
        aud: appConfigs.JWT_AUDIENCE,
        iss: appConfigs.JWT_ISSUER,
        sub: user._id,
    }, key, {
        expiresIn: appConfigs.JWT_EXPIRATION,
        algorithm: "RS256",
    });
    return {
        user: user.getInfo(),
        token,
    };
}
export default {
    authenticate,
};
