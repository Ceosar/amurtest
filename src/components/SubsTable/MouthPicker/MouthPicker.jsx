import React, { useEffect, useState } from "react";

//styles
import { Box, useMediaQuery, useTheme } from "@mui/material";

//date picker
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

/**
 * Компонент выбора месяцев
 * @param {*} onPeriodChange - Выбранный промежуток времени
 * @returns
 */
const MouthPicker = ({onPeriodChange}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [period, setPeriod] = useState({
        periodBegin: dayjs().subtract(5, 'month').startOf('month'),
        periodEnd: dayjs().endOf('month')
    })

    /**
     * Выбор начальной даты
     * @param {*} date - дата
     */
    const handleBeginChange = (date) => {
        setPeriod(prev => ({
            ...prev,
            periodBegin: date
        }));
    };

    /**
     * Выбор конечной даты
     * @param {*} date - дата
     */
    const handleEndChange = (date) => {
        setPeriod(prev => ({
            ...prev,
            periodEnd: date
        }));
    };

    useEffect(() => {
        if (period.periodBegin && period.periodEnd) {
            const formattedPeriod = {
                begin: period.periodBegin.format('YYYYMM'),
                end: period.periodEnd.format('YYYYMM')
            };
            if (onPeriodChange) {
                onPeriodChange(formattedPeriod);
            }
        }
    }, [period, onPeriodChange]);

    const datePickerSlotStyles = {
        textField: {
            size: isMobile ? 'small' : 'medium',
            sx: {
                width: isMobile ? '90%' : 200,
                '& .MuiInputBase-root': {
                    fontSize: isMobile ? '0.875rem' : '1rem'
                }
            }
        }
    }

    const datePickerContainerStyles = {
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        gap: 2,
        m: isMobile ? 1 : 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    }

    return (
        <Box sx={datePickerContainerStyles}>
            <DatePicker
                label="Начало периода"
                value={period.periodBegin}
                onChange={(date) => handleBeginChange(date)}
                views={['year', 'month']}
                slotProps={datePickerSlotStyles}
                />
            <DatePicker
                label="Конец периода"
                views={['year', 'month']}
                onChange={(date) => handleEndChange(date)}
                value={period.periodEnd}
                slotProps={datePickerSlotStyles}
            />
        </Box>
    );
}

export default MouthPicker;