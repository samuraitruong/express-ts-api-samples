export interface IFacebookResult {
    provider: string;
    id: string;
    displayName: string;
    name: IFacebookName;
    gender: string;
    emails: IStringValue[];
    photos: IStringValue[];
    _raw: IFacebookProfile;
    _json: IFacebookProfile;
}

export interface IFacebookProfile {
    id: string;
    name: string;
    last_name: string;
    first_name: string;
    email: string;
}

export interface IStringValue {
    value: string;
}

export interface IFacebookName {
    familyName: string;
    givenName: string;
    middleName: string;
}
