import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestPayments } from "../../services/service";

/**
 * Асинхронный thunk для загрузки платежей по лицевому счету
 * @function fetchPayments
 * @param {string|number} params.subscrId - ID лицевого счета
 * @param {Object} params.period - Период для выборки платежей
 * @param {string} params.period.begin - Начало периода (формат YYYYMM)
 * @param {string} params.period.end - Конец периода (формат YYYYMM)
 */
export const fetchPayments = createAsyncThunk(
    'payments/fetchPayments',
    async ({subscrId, period}, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await requestPayments(auth.token, subscrId.toString(), period.begin, period.end);
            if (!response.success) {
                if (response.msg.includes('повторите авторизацию')) {
                    return rejectWithValue({
                        message: response.msg,
                        shouldLogout: true
                    });
                }
                return rejectWithValue(response.msg);
            }

        return response.result;
        } catch (error) {
        return rejectWithValue(error.response?.data?.msg || 'Ошибка соединения');
        }
    }
);

/**
 * Начальное состояние хранилища платежей
 * @type {Object}
 * @property {Object} payments - Объект с платежами (ключ - subscrId)
 * @property {boolean} loading - Флаг загрузки данных
 * @property {string|null} error - Текст ошибки или null
 * @property {Object|null} period - Текущий период выборки
 */
const initialState = {
    payments: {},
    loading: false,
    error: null,
    period: null,
};

/**
 * Слайс для работы с платежами
 * @module paymentsSlice
 */

const paymentsSlice = createSlice({
    name: "payments",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchPayments.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPayments.fulfilled, (state, action) => {
                state.loading = false;
                const { subscrId } = action.meta.arg;
                state.payments[subscrId] = action.payload;
                state.error = null;
            })
            .addCase(fetchPayments.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default paymentsSlice.reducer;
