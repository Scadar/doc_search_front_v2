import { useSnackbar } from "notistack";
import { useCallback } from "react";

export const useAppSnackbar = () => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    return {
        enqueueSnackbar,
        closeSnackbar,
        errorSnackbar: useCallback(
            (message: string) => enqueueSnackbar(message, { variant: "error" }), [enqueueSnackbar]
        ),
        successSnackbar: useCallback(
            (message: string) => enqueueSnackbar(message, { variant: "success" }), [enqueueSnackbar]
        )
    };
};