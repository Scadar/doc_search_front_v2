import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/login/Login";
import ResetPassword from "../pages/resetPassword/ResetPassword";
import ResetPasswordRequest from "../pages/resetPassword/ResetPasswordRequest";
import PublicLayout from "../layouts/public/PublicLayout";

const PublicRoutes: FC = () => {
    return (
        <Routes>
            <Route path="/" element={ <PublicLayout/> }>
                <Route path="login" element={ <Login/> }/>
                <Route path="auth/reset-password" element={ <ResetPasswordRequest/> }/>
                <Route path="auth/reset-password/:token" element={ <ResetPassword/> }/>
                <Route path="*" element={ <Navigate to="/login"/> }/>
                <Route index element={ <Navigate to="/login"/> }/>
            </Route>
        </Routes>
    );
};

export default PublicRoutes;