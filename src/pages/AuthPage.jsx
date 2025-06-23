import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { TextField, Button, Box, Typography, InputAdornment, IconButton, Tabs, Tab } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { AlertContext } from '../utils/AlertProvider';
import { validateEmail } from '../utils/validateEmail';

/**
 * Компонент страницы авторизации пользователя
 * @returns <AuthPage />
 */
const AuthPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { showAlert } = useContext(AlertContext);

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [loginEnter, setLoginEnter] = useState('login');


    /**
     * Обработка отправки формы авторизации
     * @param {React.FormEvent} e
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        if (!identifier) {
            validationErrors.identifier = loginEnter === 'email'
                ? 'Введите email'
                : 'Введите логин';
        } else if (loginEnter === 'email' && !validateEmail(identifier)) {
            validationErrors.identifier = 'Введите корректный email';
        }

        if (!password) {
            validationErrors.password = 'Введите пароль';
        } else if (password.length < 6) {
            validationErrors.password = 'Пароль должен содержать минимум 6 символов';
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const credentials = loginEnter === 'email'
            ? { email: identifier, password }
            : { username: identifier, password };

        dispatch(loginUser(credentials))
            .then((action) => {
                if (loginUser.fulfilled.match(action)) {
                    navigate('/');
                } else {
                    showAlert(action.payload, 'error', 5000);
                }
            });
    };

    /**
     * Переключение между входом по почте и логину
     */
    const handleEnterChange = (_event, newValue) => {
        setLoginEnter(newValue)
        setIdentifier('');
        setErrors({});
    };

    return (
        <Box sx={{
            maxWidth: 400,
            mx: 'auto',
            mt: 10,
            p: 3,
            boxShadow: 3,
            borderRadius: 2
        }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 3 }}>
                Вход в личный кабинет
            </Typography>

            <Tabs
                value={loginEnter}
                onChange={handleEnterChange}
                variant="fullWidth"
                sx={{ mb: 3 }}>
                <Tab label="По логину" value={'login'}/>
                <Tab label="По почте" value={'email'}/>
            </Tabs>

            <form onSubmit={handleSubmit}>
                <TextField
                    label={loginEnter === 'email' ? "Почта" : "Логин"}
                    fullWidth
                    margin="normal"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    error={!!errors.identifier}
                    helperText={errors.identifier}
                />

                <TextField
                    label="Пароль"
                    type={showPassword ? 'text' : 'password'}
                    fullWidth
                    margin="normal"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{ mt: 3, py: 1.5 }}
                >
                    Войти
                </Button>
            </form>
        </Box>
    );
};

export default AuthPage;