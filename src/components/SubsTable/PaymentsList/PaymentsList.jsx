import React from "react";

//redux
import { useSelector } from "react-redux";

//ui
import {
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    useMediaQuery,
    useTheme
} from "@mui/material";

//utils
import { formatDate } from "../../../utils/formatDates";

/**
 * Список платежей
 * @param {*} subscrId - идентификатор выбранного лицевого счета
 * @returns <PaymentsList />
 */
const PaymentsList = ({ subscrId }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const { payments, loading } = useSelector(state => state.payments);
    const currentPayments = payments[subscrId] || [];

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
                            Дата
                        </TableCell>
                        <TableCell sx={headerTableCellStyles}>
                            Период
                        </TableCell>
                        <TableCell sx={headerTableCellStyles}>
                            Источник
                        </TableCell>
                        <TableCell align="right" sx={headerTableCellStyles}>
                            Сумма (₽)
                        </TableCell>
                    </TableRow>
                </TableHead>
                {loading ? (
                    <TableBody>
                        <TableRow>
                            <TableCell colSpan={4} align="center" sx={{ height: '150px' }}>
                                <CircularProgress size={isMobile ? 40 : 60} />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {currentPayments?.length > 0 ? (
                            currentPayments.map((payment) => (
                                <TableRow key={payment.PaymenId + payment.Amount}>
                                    <TableCell sx={tableCelStyles}>
                                        {formatDate(payment.Date)}
                                    </TableCell>
                                    <TableCell sx={tableCelStyles}>
                                        {payment.PeriodName}
                                    </TableCell>
                                    <TableCell sx={tableCelStyles}>
                                        {payment.PaymentSource}
                                    </TableCell>
                                    <TableCell align="right" sx={tableCelStyles}>
                                        {payment.Amount.toLocaleString('ru-RU', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))
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

export default PaymentsList;