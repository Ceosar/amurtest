import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { requestCharges } from "../../services/service";

export const fetchCharges = createAsyncThunk(
    'charges/fetchCharges',
    async ({period}, { getState, rejectWithValue }) => {
        try {
            const { auth } = getState();
            const response = await requestCharges(auth.token, period.begin, period.end);
            if (!response.success) {
                if (response.msg.includes('повторите авторизацию')) {
                    // return response.msg
                    return rejectWithValue({
                        message: response.msg,
                        shouldLogout: true
                    });
                }
                return rejectWithValue(response.msg);
            }

        return response.results;
        } catch (error) {
        return rejectWithValue(error.response?.data?.msg || 'Ошибка соединения');
        }
    }
);

const initialState = {
    charges: [],
    loading: false,
    error: null,
    period: null,
};

const chargesSlice = createSlice({
    name: "charges",
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
            .addCase(fetchCharges.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCharges.fulfilled, (state, action) => {
                state.loading = false;
                state.charges = action.payload;
                state.error = null;
            })
            .addCase(fetchCharges.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }

});

// export const {  } = chargesSlice.actions;
export default chargesSlice.reducer;

