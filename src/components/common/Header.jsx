import React from "react";

//redux
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

//ui
import { Box, Button, Typography } from "@mui/material";

/**
 * Заголовок
 * @param {*} title - Заголовок (string)
 * @returns <Header />
 */
const Header = ({title}) => {
    const dispatch = useDispatch();

    /**
     * Выход из аккаунта
     */
    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <Box display={"flex"} justifyContent={"space-between"} p={2}>
            <Typography variant="h5">{title}</Typography>
            <Button variant="outlined" onClick={handleLogout}>Выйти</Button>
        </Box>
    );
}

export default Header;