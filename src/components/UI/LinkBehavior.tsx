import React from "react";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

export const LinkBehavior = React.forwardRef<any,
    Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }>((props, ref) => {
    const { href, ...other } = props;
    return <RouterLink data-testid="custom-link" ref={ ref } to={ href } { ...other } />;
});