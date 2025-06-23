import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//redux
import { useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';

//styles
import { TextField, Button, Box, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

//utils
import { AlertContext } from '../utils/AlertProvider';

/**
 * Компонент страницы авторизации пользователя
 * @returns <AuthPage />
 */
const AuthPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { showAlert } = useContext(AlertContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    /**
     * Функция обработки формы авторизации
     * @param {*} e
     * @returns {void}
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};

        // if (!email) {
        // validationErrors.email = 'Введите почту';
        // } else if (!validateEmail(email)) {
        // validationErrors.email = 'Введите корректные данные почты!';
        // }

        if (!password) {
        validationErrors.password = 'Введите пароль';
        } else if (password.length < 6) {
        validationErrors.password = 'Пароль должен содержать минимум 6 символов!';
        }

        if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
        }

        dispatch(loginUser({
        username: email,
        password: password,
        }))
        .then((action) => {
            if (loginUser.fulfilled.match(action)) {
                navigate('/');
            }
            else{
                showAlert(action.payload, 'error', 5000);
            }
        });
    };

    /**
     * Переключает видимость пароля
     */
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Box sx={{
            maxWidth: 400,
            mx: 'auto',
            mt: 20,
            p: 3
            }}>
            <Typography variant="h4" gutterBottom>Вход в личный кабинет</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                label="Почта"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
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
                            onClick={handleClickShowPassword}
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
                sx={{ mt: 2 }}
                >
                    Войти
                </Button>
            </form>
        </Box>
    );
};

export default AuthPage;