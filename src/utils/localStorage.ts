export enum TokenType {
    REFRESH = "refresh_token",
    ACCESS = "access_token"
}

export const setTokenToLocalStorage = (token: TokenType, value: string) => {
    if (token === TokenType.REFRESH) {
        localStorage.setItem(TokenType.REFRESH, value);
    } else {
        localStorage.setItem(TokenType.ACCESS, value);
    }
};

export const removeTokenFromLocalStorage = (token: TokenType) => {
    if (token === TokenType.REFRESH) {
        localStorage.removeItem(TokenType.REFRESH);
    } else {
        localStorage.removeItem(TokenType.ACCESS);
    }
};

export const getTokenFromLocalStorage = (token: TokenType): string | null => {
    if (token === TokenType.REFRESH) {
        return localStorage.getItem(TokenType.REFRESH);
    } else {
        return localStorage.getItem(TokenType.ACCESS);
    }
};
