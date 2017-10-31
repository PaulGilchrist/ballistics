interface IConfig {
    clientId: string;
    tenant: string;

    extraQueryParameter?: string;
    cacheLocation?: "localStorage" | "sessionStorage";
    expireOffsetSeconds?: number;
}

interface User {
    readonly userName: string;
    readonly profile: { [key: string]: any };
}

interface Storage {
    LOGIN_REQUEST: "adal.login.request"
}

interface Constants {
    STORAGE: Storage
}

declare class AuthenticationContext {
    constructor(config: IConfig);

    isCallback(obj: string): boolean;
    handleWindowCallback();
    getLoginError(): string;

    _getItem(key: string): string;

    getCachedUser(): User;
    getUser(callback: (msg, user: User) => void): void;
    getCachedToken(resource: string): string;
    acquireToken(resource: string, callback: (error, token: string) => void): void;

    login(): void;

    CONSTANTS: Constants;
}

declare module "adal-angular" {
    export = AuthenticationContext
}