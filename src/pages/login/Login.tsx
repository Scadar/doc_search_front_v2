import React, { FC, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { Avatar, Box, Link, TextField, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { authApi } from "../../services/authService";
import { useUpdateEffect } from "../../hooks/useUpdateEffect";
import ShowPassword from "../../components/ShowPassword";
import { LoadingButton } from "@mui/lab";
import { useAppSnackbar } from "../../hooks/useAppSnackbar";

const validationSchema = yup.object({
    email: yup.string()
              .required("Логин обязателен")
              .email("Неверный формат почты"),
    password: yup.string()
                 .required("Пароль обязателен")
});

const Login: FC = () => {

    const { errorSnackbar } = useAppSnackbar();
    const [showPassword, setShowPassword] = useState(false);
    const [fetchLogin, { error, isLoading }] = authApi.useFetchLoginMutation();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        validationSchema: validationSchema,
        onSubmit: ({ email, password }) => {
            fetchLogin({ email, password });
        }
    });

    useUpdateEffect(() => {
        if (error) {
            // @ts-ignore
            if (error.data.error === "Bad credentials") {
                errorSnackbar("Неверный логин или пароль");
            } else {
                errorSnackbar("Ошибка сервера");
            }
        }
    }, [error, errorSnackbar]);

    return (
        <>
            <Avatar
                sx={ {
                    margin: 1,
                    backgroundColor: theme => theme.palette.error.light
                } }
            >
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h2" variant="h5">
                Вход
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
                    id="email"
                    name="email"
                    label="Почта"
                    value={ formik.values.email }
                    onChange={ formik.handleChange }
                    error={ formik.touched.email && Boolean(formik.errors.email) }
                    helperText={ formik.touched.email && formik.errors.email }
                    autoFocus
                    autoComplete="email"
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="password"
                    name="password"
                    label="Пароль"
                    type={ showPassword ? "text" : "password" }
                    sx={ { backgroundColor: "rgb(232, 240, 254)" } }
                    InputProps={ {
                        endAdornment: <ShowPassword showPassword={ showPassword } setShowPassword={ setShowPassword }/>
                    } }
                    value={ formik.values.password }
                    onChange={ formik.handleChange }
                    error={ formik.touched.password && Boolean(formik.errors.password) }
                    helperText={ formik.touched.password && formik.errors.password }
                    autoComplete="current-password"
                />
                <Typography>
                    Забыли пароль?
                    <Link
                        href="/auth/reset-password"
                        sx={ {
                            ml: 1,
                            textDecoration: "none"
                        } }
                    >
                        Сбросить
                    </Link>
                </Typography>
                <LoadingButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    loading={ isLoading }
                    sx={ theme => ({
                        margin: theme.spacing(3, 0, 2)
                    }) }
                >
                    Войти
                </LoadingButton>
            </Box>
        </>
    );
};

export default Login;
