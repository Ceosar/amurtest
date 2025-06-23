import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

// Styles
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
    Box,
    Collapse,
    List,
    ListItem,
    ListItemText,
    ListSubheader,
    Typography,
    Paper,
    useTheme,
    useMediaQuery,
    Tabs,
    Tab
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { fetchPayments } from "../../redux/slices/paymentsSlice";

//components
import MouthPicker from "./MouthPicker/MouthPicker";
import PaymentsList from "./PaymentsList/PaymentsList";

// Utils
import { AlertContext } from "../../utils/AlertProvider";
import ChargesList from "./ChargesList/ChargesList";
import { fetchCharges } from "../../redux/slices/chargesSlice";

/**
 * Таблица лицевых счетов
 * @returns <SubsTable />
 */
const SubsTable = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const styles = useStyles();

    const { subscriptions, error } = useSelector(state => state.subs);
    const { showAlert } = useContext(AlertContext);
    const [expanded, setExpanded] = useState(null);
    const [tableType, setTableType] = useState('charges');

    /**
     * Выбор лицевого счета
     * @param {*} subs - лицевые счета
     */
    const handleSelectSub = (subs) => {
        setExpanded(expanded === subs.SubscrId ? null : subs.SubscrId);
    }

    /**
     * Выбор периода
     * @param {*} period - выбранный промежуток времени
     */
    const handleOnPeriodChange = (period) => {
        if (expanded) {
            if(tableType === "charges"){
                dispatch(fetchCharges({period}))
            } else{
                dispatch(fetchPayments({ period, subscrId: expanded }));
            }
        }
    }

    useEffect(() => {
        if (error?.includes('Время сессии закончилось')) {
            showAlert(error, 'error', 5000);
            dispatch(logout());
            navigate('/login');
        }
    }, [error, showAlert, dispatch, navigate]);

    const subsTableContainerStyles = {
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        p: isMobile ? null : 2
    }

    const paperStyles = {
        width: '100%',
        maxWidth: 1920,
        minWidth: 300,
        borderRadius: isMobile ? null : 2,
        overflow: 'hidden'
    }

    /**
     * Выбор типа таблицы
     * @param {*} _event
     * @param {*} newValue
     */
    const handleTypeChange = (_event, newValue) => {
        setTableType(newValue);
    }

    return (
        <Box sx={subsTableContainerStyles}>
            <Paper elevation={3} sx={paperStyles}>
                <List
                    className={styles.container}
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader
                            component="div"
                            id="nested-list-subheader"
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                fontSize: '1.1rem',
                                fontWeight: 'bold'
                            }}
                        >
                            Лицевые счета
                        </ListSubheader>
                    }
                >
                    {subscriptions.map((subs, index) => (
                        <Box
                            className={styles.itemContainer}
                            key={index}
                            sx={{
                                '&:not(:last-child)': {
                                    borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
                                }
                            }}
                        >
                            <ListItem
                                button = "true"
                                onClick={() => handleSelectSub(subs)}
                                sx={{
                                    transition: 'background-color 0.3s',
                                    '&:hover': {
                                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={
                                        <Typography variant="subtitle1" fontWeight="medium">
                                            Л/С: {subs.SubscrCode}
                                        </Typography>
                                    }
                                    secondary={`${subs.FIO}, ${subs.Address}`}
                                />
                                {expanded === subs.SubscrId ? <ExpandLess /> : <ExpandMore />}
                            </ListItem>
                            <Collapse in={expanded === subs.SubscrId} timeout="auto" unmountOnExit>
                                <Box sx={{
                                    display: 'flex',
                                    width: '100%',
                                    gap: 1,
                                    p: 1,
                                    flexDirection: 'column',
                                    bgcolor: 'background.paper'
                                }}>
                                    <MouthPicker onPeriodChange={handleOnPeriodChange}/>
                                    <Tabs
                                        value={tableType}
                                        onChange={handleTypeChange}
                                        variant="fullWidth"
                                        sx={{ mb: 3 }}>
                                        <Tab label="Начисления" value={'charges'}/>
                                        <Tab label="Платежи" value={'payments'}/>
                                    </Tabs>
                                    {tableType === 'charges' ? (
                                        <ChargesList subscrId={subs.SubscrId}/>
                                    ):(
                                        <PaymentsList subscrId={subs.SubscrId}/>
                                    )}
                                </Box>
                            </Collapse>
                        </Box>
                    ))}
                </List>
            </Paper>
        </Box>
    );
}

const useStyles = makeStyles({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        padding: 0
    },
    itemContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
});

export default SubsTable;