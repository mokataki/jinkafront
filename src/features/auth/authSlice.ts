import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { register, login } from './authThunks';

// Define the state structure
interface AuthState {
    user: any | null;
    token: string | null;
    name: string | null;
    photo: string | null;
    email: string | null;
    role: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

// Initial state with values from localStorage, if available
const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem('userData') || 'null'),  // Load user data from localStorage
    token: localStorage.getItem('accessToken') || null,            // Load token from localStorage
    isAuthenticated: !!localStorage.getItem('accessToken'),        // If there's a token, user is authenticated
    name: null,
    email: null,
    photo: null,
    role: null,
    isLoading: false,
    error: null,
};

// Auth slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Set user data and token to Redux state and localStorage
        setUser: (state, action: PayloadAction<{ user: any; token: string }>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = !!token;
            state.role = user?.role || null;
            state.name = user?.name || null;
            state.email = user?.email || null;
            state.photo = user?.photo || null;

            // Persist user data in localStorage
            localStorage.setItem('accessToken', token);
            localStorage.setItem('userData', JSON.stringify(user));
        },

        // Load user from localStorage (used for rehydration)
        loadUser: (state) => {
            const userData = localStorage.getItem('userData');
            const token = localStorage.getItem('accessToken');

            if (userData && token) {
                const user = JSON.parse(userData);
                state.user = user;
                state.token = token;
                state.isAuthenticated = true;
                state.role = user?.role || null;
                state.name = user?.name || null;
                state.email = user?.email || null;
                state.photo = user?.photo || null;
            } else {
                state.isAuthenticated = false;
                state.user = null;
            }
        },

        // Logout and clear all stored data
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.name = null;
            state.email = null;
            state.photo = null;
            state.role = null;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userData');
        },
    },

    // Handle async actions (register and login)
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<{ user: any; token: string }>) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                state.role = action.payload.user?.role || null;
                state.name = action.payload.user?.name || null;
                state.email = action.payload.user?.email || null;
                state.photo = action.payload.user?.photo || null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ user: any; token: string }>) => {
                state.isLoading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = !!action.payload.token;
                state.name = action.payload.user?.name || null;
                state.role = action.payload.user?.role || null;
                state.email = action.payload.user?.email || null;
                state.photo = action.payload.user?.photo || null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setUser, loadUser, logout } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (state: { auth: AuthState }) => state.auth;

