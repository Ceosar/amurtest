import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestLogin } from "../../services/service.js";

/**
 * Асинхронный thunk для авторизации пользователя
 * @function fetchPayments
 * @param {string} params.username - МИмя пользователя
 * @param {string} params.password - Пароль
 */
export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ username, password }, { rejectWithValue }) => {
        try {
            const response = await requestLogin(username, password);

            if (!response?.success) {
                return rejectWithValue(response?.msg || 'Произошла ошибка авторизации');
            }

            return {
                token: response.extToken,
            };
        } catch (error) {
            return rejectWithValue(error.response?.data?.msg || 'Ошибка соединения');
        }
    }
);

/**
 * Начальное состояние хранилища авторизации
 * @type {Object}
 * @property {boolean} isAuth - Флаг авторизации пользователя
 * @property {Objectl} user - Данные пользователя
 * @property {string} token - Токен авторизации
 * @property {string} error - Текст ошибки авторизации
 * @property {boolean} loading - Флаг процесса загрузки
 */
const initialState = {
    isAuth: !!localStorage.getItem('authToken'),
    user: null,
    token: localStorage.getItem('authToken') || null,
    error: null,
    loading: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout(state) {
            state.isAuth = false;
            state.user = null;
            state.token = null;
            localStorage.removeItem('authToken');
        },
        clearError(state) {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isAuth = true;
                state.token = action.payload.token;
                state.loading = false;
                localStorage.setItem('authToken', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;