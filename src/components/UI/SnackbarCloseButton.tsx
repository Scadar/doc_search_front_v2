import React, { FC } from "react";
import { useSnackbar } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type Key = string | number | undefined

type SnackbarCloseButtonProps = {
    myKey: Key
}

const SnackbarCloseButton: FC<SnackbarCloseButtonProps> = ({ myKey }: SnackbarCloseButtonProps) => {
    const { closeSnackbar } = useSnackbar();
    return (
        <IconButton
            aria-label="Close notification"
            color="inherit"
            onClick={ () => closeSnackbar(myKey) }
        >
            <CloseIcon fontSize="small"/>
        </IconButton>
    );
};

export default SnackbarCloseButton;