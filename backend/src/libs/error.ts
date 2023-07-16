export class StandardError extends Error {
    public error_code: string;

    public lastError?: Record<string, unknown> | null;

    public context?: Record<string, unknown> | null;

    constructor(
        errorCode: string,
        message?: string,
        lastError?: Record<string, unknown> | null,
        context?: Record<string, unknown> | null
    ) {

        const msg = message || ErrorMessage[errorCode];
        super(msg);

        // So you can do typeof CustomError
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = this.constructor.name;
        this.error_code = errorCode;
        this.lastError = lastError;
        this.context = context;
    }
}

export const ErrorCodes = {
    INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
    USER_NOT_FOUND: 'USER_NOT_FOUND',
    EMAIL_ALREADY_EXIST: 'EMAIL_ALREADY_EXIST',
    ITEM_NOT_FOUND: 'ITEM_NOT_FOUND',
    BID_TIME_OVER: 'BID_TIME_OVER',
    BID_PRICE_LOWER_THAN_PREVIOUS: 'BID_PRICE_LOWER_THAN_PREVIOUS',
    BALANCE_NOT_ENOUGH: 'BALANCE_NOT_ENOUGH'
};
export const ErrorMessage: { [key: string]: string } = {
    INVALID_CREDENTIALS: 'You have entered invalid credentials',
    USER_NOT_FOUND: 'User id not found',
    EMAIL_ALREADY_EXIST: 'EMAIL_ALREADY_EXIST',
    ITEM_NOT_FOUND: 'ITEM_NOT_FOUND',
    BID_TIME_OVER: 'Your bid did not go through because the period is over',
    BID_PRICE_LOWER_THAN_PREVIOUS: 'Your bid price is lower than the last bid price',
    BALANCE_NOT_ENOUGH: 'Your balance is not enough, please top up your balance'
}
export const ErrorCodeMap: { [key: string]: number } = {
    INVALID_CREDENTIALS: 401,
    USER_NOT_FOUND: 404,
    EMAIL_ALREADY_EXIST: 400,
    ITEM_NOT_FOUND: 404,
    BID_TIME_OVER: 400,
    BALANCE_NOT_ENOUGH: 400,
};

export const ErrorCodeTypeorm: { [key: number]: string } = {
    23505: 'EMAIL_ALREADY_EXIST'
}