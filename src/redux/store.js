import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import subsReducer from "./slices/subsSlice";
import paymentsReducer from "./slices/paymentsSlice";
import chargesReducer from "./slices/chargesSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        subs: subsReducer,
        payments: paymentsReducer,
        charges: chargesReducer,
    },
});