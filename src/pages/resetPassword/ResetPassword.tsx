import React, { FC, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box, ButtonGroup, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { authApi } from "../../services/authService";
import { useAppSnackbar } from "../../hooks/useAppSnackbar";
import { LoadingButton } from "@mui/lab";

const validationSchema = yup.object({
    password: yup.string()
                 .required("Введите пароль")
                 .min(8, "Минимум 8 символов"),
    passwordConfirmation: yup.string()
                             .required("Введите пароль")
                             .oneOf([yup.ref("password"), null], "Пароли должны совпадать")
});

const ResetPassword: FC = () => {

    const { token } = useParams();
    const navigate = useNavigate();
    const [resetPassword, { error, data, isLoading }] = authApi.useFetchResetPasswordMutation();

    const { successSnackbar, errorSnackbar } = useAppSnackbar();

    useEffect(() => {
        if (data) {
            successSnackbar("Пароль успешно изменен");
            navigate("/login");
        }
        if (data === false) {
            errorSnackbar("Ссылка не действительна");
        }
        if (error) {
            errorSnackbar("Ошибка сервера");
        }
    }, [data, successSnackbar, errorSnackbar, navigate, error]);

    const formik = useFormik({
        initialValues: {
            password: "",
            passwordConfirmation: ""
        },
        validationSchema: validationSchema,
        onSubmit: (passwords) => {
            resetPassword({ password: passwords.password, token });
        }
    });

    return (
        <>
            <Typography component="h1" variant="h5">
                Введите новый пароль
            </Typography>
            <Box
                component="form"
                onSubmit={ formik.handleSubmit }
                sx={ { width: "100%", mt: 1 } }
                noValidate
            >
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    id="password"
                    name="password"
                    label="Пароль"
                    value={ formik.values.password }
                    onChange={ formik.handleChange }
                    error={ formik.touched.password && Boolean(formik.errors.password) }
                    helperText={ formik.touched.password && formik.errors.password }
                    autoFocus
                    autoComplete="password"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    type="password"
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    label="Повторите пароль"
                    value={ formik.values.passwordConfirmation }
                    onChange={ formik.handleChange }
                    error={ formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation) }
                    helperText={ formik.touched.passwordConfirmation && formik.errors.passwordConfirmation }
                    autoComplete="password"
                />
                <ButtonGroup
                    variant="outlined"
                    color="primary"
                    sx={ {
                        justifyContent: "center",
                        width: "100%",
                        mt: 1
                    } }
                >
                    <LoadingButton
                        type="submit"
                        loading={ isLoading }
                        variant="outlined"
                    >
                        Сбросить пароль
                    </LoadingButton>
                </ButtonGroup>
            </Box>
        </>
    );
};

export default ResetPassword;