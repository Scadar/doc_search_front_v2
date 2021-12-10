import { createApi } from "@reduxjs/toolkit/query/react";
import { ILoginResponse, IUser } from "../models/userModel";
import { logout, setAuthUser, setGlobalLoading } from "../store/slices/auth";
import { getTokenFromLocalStorage, setTokenToLocalStorage, TokenType } from "../utils/localStorage";
import { baseQuery } from "./config/query";
import { securityServerPath } from "./config/urls";

const authPath = (url: string): string => {
    return securityServerPath("auth/" + url);
};

export const authApi = createApi({
    reducerPath: "authAPI",
    baseQuery: baseQuery,
    endpoints: (build) => ({
        fetchLogin: build.mutation<IUser, { email: string, password: string }>({
            query: ({ email, password }) => ({
                url: authPath("login"),
                method: "POST",
                body: { email, password }
            }),
            transformResponse(response: ILoginResponse) {
                setTokenToLocalStorage(TokenType.ACCESS, response.accessToken);
                setTokenToLocalStorage(TokenType.REFRESH, response.refreshToken);
                return parseJwt<IUser>(response.accessToken);
            },
            async onQueryStarted(arg, api) {
                try {
                    const { data } = await api.queryFulfilled;
                    api.dispatch(setAuthUser(data));
                } catch (e) {
                    api.dispatch(setAuthUser(null));
                }
            }
        }),
        fetchProfile: build.query<void, void>({
            query: () => ({
                url: authPath("profile"),
                method: "GET",
                validateStatus: (a, b) => {
                    return b.status !== 401;
                }
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                const accessToken = getTokenFromLocalStorage(TokenType.ACCESS);
                if (!accessToken) {
                    dispatch(setGlobalLoading(false));
                    dispatch(logout());
                    return;
                }

                dispatch(setGlobalLoading(true));
                try {
                    await queryFulfilled;
                    const user = parseJwt<IUser>(accessToken);
                    dispatch(setAuthUser(user));
                } catch (e) {
                    dispatch(logout());
                } finally {
                    dispatch(setGlobalLoading(false));
                }
            }
        }),
        fetchRefresh: build.mutation<{ accessToken: string }, void>({
            query: () => ({
                url: authPath("refresh"),
                method: "POST",
                body: { refreshToken: getTokenFromLocalStorage(TokenType.REFRESH) }
            }),
            extraOptions: {
                disableToken: true
            },
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const user = parseJwt<IUser>(data.accessToken);
                    setTokenToLocalStorage(TokenType.ACCESS, data.accessToken);
                    dispatch(setAuthUser(user));
                } catch (e) {
                    dispatch(logout());
                }
            }
        }),
        fetchResetPassword: build.mutation<boolean, { password: string, token: string | undefined }>({
            query: ({ password, token }) => ({
                url: authPath("password-reset"),
                method: "POST",
                body: { password, token }
            })
        }),
        fetchPasswordResetRequest: build.mutation<boolean, { email: string }>({
            query: ({ email }) => ({
                url: authPath("password-reset-request"),
                method: "POST",
                body: { email }
            })
        })
    })
});

export const parseJwt = <T>(token: string): T => {

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+")
                            .replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64)
    .split("")
    .map(function(c) {
        return "%" + ("00" + c.charCodeAt(0)
                              .toString(16)).slice(-2);
    })
    .join(""));

    return JSON.parse(jsonPayload);
};