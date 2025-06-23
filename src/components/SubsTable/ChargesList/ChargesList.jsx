import React, { useContext, useEffect } from "react";

//ui
import {
    CircularProgress,
    Table, TableBody, TableCell,
    TableContainer, TableHead,
    TableRow, useMediaQuery, useTheme } from "@mui/material"

//redux
import { useSelector } from "react-redux";

//utils
import { AlertContext } from "../../../utils/AlertProvider";

/**
 * Таблица начислений
 * @param {*} param.subscrId -идентификатор выбранного ЛС
 * @returns
 */
const ChargesList = ({ subscrId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { showAlert } = useContext(AlertContext);

    const { charges, loading, error } = useSelector(state => state.charges);


    useEffect(() => {
        if (error) {
            showAlert(error, 'error', 5000);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error]);

    const tableCelStyles = {
        fontSize: isMobile ? '0.75rem' : '0.875rem',
        px: isMobile ? 1 : 2,
        py: isMobile ? 1 : 1.5
    }

    const headerTableCellStyles = {
        ...tableCelStyles,
        fontWeight: 'bold',
        fontSize: isMobile ? '0.75rem' : '0.875rem',
        py: isMobile ? 1 : 1.5
    };

    const tableContainerStyles = {
        maxWidth: '100%',
        overflowX: 'auto',
        '&::-webkit-scrollbar': {
            height: '4px'
        }
    }
    return (
        <TableContainer sx={tableContainerStyles}>
            <Table sx={{
                minWidth: isMobile ? 280 : 600,
                tableLayout: isMobile ? 'auto' : 'fixed'
            }} aria-label="История платежей">
                <TableHead>
                    <TableRow sx={{ bgcolor: '#e0e0e0' }}>
                        <TableCell sx={headerTableCellStyles}>
                            Период
                        </TableCell>
                        <TableCell sx={headerTableCellStyles}>
                            Источник
                        </TableCell>
                        <TableCell sx={headerTableCellStyles}>
                            К оплате на начало месяца
                        </TableCell>
                        <TableCell sx={headerTableCellStyles}>
                            Начислено
                        </TableCell>
                        <TableCell sx={headerTableCellStyles}>
                            Оплачено
                        </TableCell>
                        <TableCell align="right" sx={headerTableCellStyles}>
                            К оплате (₽)
                        </TableCell>
                    </TableRow>
                </TableHead>
                {loading ? (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={6} align="center" sx={{ height: '150px' }}>
                                <CircularProgress size={isMobile ? 40 : 60} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {charges?.length > 0 ? (
                            charges
                                .filter(charge => charge.SubscrId === subscrId)
                                .flatMap(charge =>
                                charge.ChargeDetails.map((detail, index) => (
                                    <TableRow key={`${charge.ChargeId}-${detail.ChargeDetailId}-${index}`}>
                                        <TableCell sx={tableCelStyles}>
                                            {charge.PeriodName}
                                        </TableCell>
                                        <TableCell sx={tableCelStyles}>
                                            {detail.GroupName || 'Нет данных'}
                                        </TableCell>
                                        <TableCell sx={tableCelStyles}>
                                            {charge.DebtByBeginMonth}
                                        </TableCell>
                                        <TableCell sx={tableCelStyles}>
                                            {detail.Amount}
                                        </TableCell>
                                        <TableCell sx={tableCelStyles}>
                                            {charge.Payment}
                                        </TableCell>
                                        <TableCell align="right" sx={tableCelStyles}>
                                            {charge.AmountToPay}
                                        </TableCell>
                                    </TableRow>
                                )))
                            ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center" sx={tableCelStyles}>
                                    Нет данных о платежах
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                )}
            </Table>
        </TableContainer>
    );
}

export default ChargesList;