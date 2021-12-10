import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { getTokenFromLocalStorage, setTokenToLocalStorage, TokenType } from "../../utils/localStorage";
import { logout } from "../../store/slices/auth";
import { securityServerPath } from "./urls";

const authPath = (url: string): string => {
    return securityServerPath("auth/" + url);
};

export const baseUrl = process.env.REACT_APP_REQUEST_URL

const queryWithoutAuthHeader = fetchBaseQuery({
    baseUrl: baseUrl
});

const queryWithAuthHeader = fetchBaseQuery({
    baseUrl: baseUrl,
    prepareHeaders: headers => {
        const token = getTokenFromLocalStorage(TokenType.ACCESS);
        if (token) {
            headers.set("Authorization", `Bearer ${ token }`);
        }
        return headers;
    }
});

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> =
    async(args, api, extraOptions: any) => {

        let query;
        if (extraOptions && extraOptions.disableToken) {
            query = queryWithoutAuthHeader;
        } else {
            query = queryWithAuthHeader;
        }

        let result = await query(args, api, extraOptions);

        if (result.error && result.error.status === 406) {

            const { data } = await queryWithoutAuthHeader({
                url: authPath("refresh"),
                method: "POST",
                body: { refreshToken: getTokenFromLocalStorage(TokenType.REFRESH) }
            }, api, extraOptions);

            if (data) {
                //@ts-ignore
                setTokenToLocalStorage(TokenType.ACCESS, data.accessToken);
                result = await query(args, api, extraOptions);
            } else {
                await api.dispatch(logout());
            }

        }

        return result;
    };