import React, { createContext, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

export const AlertContext = createContext();

/**
 * Провайдер для работы с алертами
 * @param {*} param.children - контент внутри обертки
 * @returns 
 */
export const AlertProvider = ({ children }) => {
    const [alert, setAlert] = useState(null);

    const showAlert = (message, severity = 'info', duration = 3000) => {
        setAlert({ message, severity, duration });
    };

    /**
     * Закрытие алерта
     */
    const handleClose = () => {
        setAlert(null);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
        {children}
        {alert && (
            <Snackbar
            open={!!alert}
            autoHideDuration={alert.duration}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
            <Alert
                severity={alert.severity}
                onClose={handleClose}
                sx={{ width: '100%' }}
            >
                {alert.message}
            </Alert>
            </Snackbar>
        )}
        </AlertContext.Provider>
    );
};