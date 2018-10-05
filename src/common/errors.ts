export class BaseError extends Error {
    public errorMessage: string;
    constructor(public errorCode: number, message?: string) {
        super(message);
        this.errorMessage = message;
    }
}
// tslint:disable-next-line:max-classes-per-file
export class LoginError extends BaseError {
    constructor(message?: string) {
        super(400, message);
    }
}

// tslint:disable-next-line:max-classes-per-file
export class InternalError extends BaseError {
    constructor(public internalError?: any) {
        super(500, "Internal Error - Please contact administrator");
    }
}
// tslint:disable-next-line:max-classes-per-file
export class NotFoundError extends BaseError {
    constructor(public message: string) {
        super(404, message || "Not found - The requested item not found");
    }
}
// tslint:disable-next-line:max-classes-per-file
export class EmailExistError extends BaseError {
    constructor() {
        super(422, "The email already in use by another user");
    }
}
// tslint:disable-next-line:max-classes-per-file
export class RequestValidationError extends BaseError {
    constructor(public error: any) {
        super(400, error.message || "");
    }
}
