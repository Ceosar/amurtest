import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import subsReducer from "./slices/subsSlice";
import paymentsReducer from "./slices/paymentsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        subs: subsReducer,
        payments: paymentsReducer,
    },
});