import { createAsyncThunk, createSlice,  } from '@reduxjs/toolkit';
import { requestSubs } from '../../services/service';

export const fetchSubscriptions = createAsyncThunk(
    'subs/fetchSubscriptions',
    async (_, { getState, rejectWithValue }) => {
        try {
        const { auth } = getState();
        const response = await requestSubs(auth.token);

        if (!response.success) {
            if (response.msg.includes('Время сессии закончилось, повторите авторизацию')) {
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
    subscriptions: [],
    loading: false,
    error: null,
    selectedSubscr: null
};

const subsSlice = createSlice({
name: 'subs',
initialState,
reducers: {
    selectSubscr(state, action) {
    state.selectedSubscr = action.payload;
    },
    clearSubsError(state) {
    state.error = null;
    }
},
extraReducers: (builder) => {
    builder
    .addCase(fetchSubscriptions.pending, (state) => {
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchSubscriptions.fulfilled, (state, action) => {
        state.loading = false;
        state.subscriptions = action.payload;
    })
    .addCase(fetchSubscriptions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message || action.payload;
    });
}
});

export const { selectSubscr, clearSubsError } = subsSlice.actions;
export default subsSlice.reducer;