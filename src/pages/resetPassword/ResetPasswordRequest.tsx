import React, { FC, useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import { Box, Button, ButtonGroup, Link, Paper, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { authApi } from "../../services/authService";
import { LoadingButton } from "@mui/lab";

const validationSchema = yup.object({
    email: yup.string()
              .required("Введите почту")
              .email("Неверный формат почты")
});

const ResetPasswordRequest: FC = () => {

    const navigate = useNavigate();
    const [passwordResetRequest, {
        data,
        isLoading,
        error,
        isUninitialized
    }] = authApi.useFetchPasswordResetRequestMutation();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (error) {
            enqueueSnackbar("Ошибка сервера", {
                variant: "error"
            });
        } else {
            if (data === false) {
                enqueueSnackbar("Такой почты не существует", {
                    variant: "error"
                });
            }
        }
    }, [data, enqueueSnackbar, error]);

    const formik = useFormik({
        initialValues: {
            email: ""
        },
        validationSchema: validationSchema,
        onSubmit: async({ email }) => {
            passwordResetRequest({ email })
            .unwrap();
        }
    });

    const requestIsSent = !isUninitialized && data;

    if (requestIsSent) {
        return (
            <Paper
                elevation={ 2 }
                sx={ {
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                } }
            >
                <Typography>На вашу почту отправлено письмо для сброса пароля.</Typography>
                <Link
                    href="/login"
                    sx={ { textDecoration: "none" } }
                >
                    <Button
                        variant="outlined"
                        color="primary"
                        sx={ {
                            textAlign: "center",
                            mt: 1
                        } }
                    >
                        Вход
                    </Button>
                </Link>
            </Paper>
        );
    }

    return (
        <>
            <Typography component="h1" variant="h5">
                Сброс пароля
            </Typography>
            <Box
                component="form"
                onSubmit={ formik.handleSubmit }
                sx={ {
                    width: "100%",
                    mt: 1
                } }
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
                <ButtonGroup
                    variant="outlined"
                    color="primary"
                    sx={ {
                        justifyContent: "center",
                        width: "100%",
                        mt: 1
                    } }
                >
                    <Button onClick={ () => navigate("/login") }>
                        Отмена
                    </Button>
                    <LoadingButton
                        variant="outlined"
                        type="submit"
                        loading={ isLoading }
                    >
                        Сбросить пароль
                    </LoadingButton>
                </ButtonGroup>
            </Box>
        </>
    );
};

export default ResetPasswordRequest;