import React, { useEffect } from "react";

//material UI
import { Box, CircularProgress } from "@mui/material";

//redux
import { useDispatch, useSelector } from "react-redux";
import { fetchSubscriptions } from "../redux/slices/subsSlice";

//components
import Header from "../components/common/Header";
import SubsTable from "../components/SubsTable/SubsTable";

/**
 * Компонент главной страницы
 * @returns <MainPage />
 */
const MainPage = () => {
    const dispatch = useDispatch();

    const { token } = useSelector(state => state.auth);
    const {loading} = useSelector(state => state.subs);

    useEffect(() => {
        if (token) {
            dispatch(fetchSubscriptions());
        }
    }, [dispatch, token]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            position: 'relative'
        }}>

            <Header title={"Личный кабинет"} />
            {loading ? (
                <Box sx={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}>
                    <CircularProgress size={60} />
                </Box>
            ):(
                <SubsTable />
            )}
        </Box>
    );
}

export default MainPage;