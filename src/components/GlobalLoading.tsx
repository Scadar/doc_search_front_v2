import React, { FC } from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { flexStyles } from "../utils/styleUtils";

const GlobalLoading: FC = () => {
    return (
        <>
            <LinearProgress />
            <Box
                sx={ {
                    ...flexStyles("center", "center", "column"),
                    width: "100%",
                    height: "calc(100vh - 4px)"
                } }
            >
                <Typography variant="h2" color="secondary.main">
                    Doc Search
                </Typography>
            </Box>
        </>

    );
};

export default GlobalLoading;