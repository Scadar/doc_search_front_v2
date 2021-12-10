import { IUser } from "../../models/userModel";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeTokenFromLocalStorage, TokenType } from "../../utils/localStorage";
import { AppDispatch } from "../store";
import { authApi } from "../../services/authService";

export type AuthState = {
    user: IUser | null
    globalLoading: boolean
}

const initialState: AuthState = {
    user: null,
    globalLoading: true
};

const loginSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthUser(state, action: PayloadAction<IUser | null>) {
            state.user = action.payload;
        },
        setGlobalLoading(state, action: PayloadAction<boolean>) {
            state.globalLoading = action.payload;
        }
    }
});

export const logout = () =>
    async(dispatch: AppDispatch) => {
        removeTokenFromLocalStorage(TokenType.REFRESH);
        removeTokenFromLocalStorage(TokenType.ACCESS);
        dispatch(authApi.util.resetApiState());
        dispatch(setAuthUser(null));
    };

export const {
    setAuthUser,
    setGlobalLoading
} = loginSlice.actions;

export default loginSlice.reducer;