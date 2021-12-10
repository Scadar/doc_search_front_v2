import React, { FC } from "react";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type ShowPasswordProps = {
    showPassword: boolean
    setShowPassword: React.Dispatch<boolean>
}

const ShowPassword: FC<ShowPasswordProps> = ({setShowPassword, showPassword}) => {
    return (
        <InputAdornment position="end">
            <IconButton
                aria-label="toggle password visibility"
                onClick={ () => setShowPassword(!showPassword) }
                onMouseDown={ e => e.preventDefault() }
            >
                { showPassword ? <VisibilityOff/> : <Visibility/> }
            </IconButton>
        </InputAdornment>
    );
};

export default ShowPassword;