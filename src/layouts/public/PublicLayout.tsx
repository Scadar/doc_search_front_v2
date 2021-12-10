import React, { FC } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { flexStyles } from "../../utils/styleUtils";
import { Outlet } from "react-router-dom";

const PublicLayout: FC = () => {
    return (
        <>
            <Grid container justifyContent={ "center" }>
                <Typography
                    component="h1"
                    variant="h2"
                    sx={ theme => ({
                        color: theme.palette.primary.main,
                        mt: 10,
                        textAlign: "center"
                    }) }
                >
                    DOC SEARCH
                </Typography>
            </Grid>
            <Container maxWidth="xs">
                <Box
                    sx={ {
                        mt: 10,
                        ...flexStyles("center", undefined, "column")
                    } }
                >
                    <Outlet/>
                </Box>
            </Container>
        </>
    );
};

export default PublicLayout;