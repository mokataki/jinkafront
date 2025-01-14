import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUser, loginUser } from '../../api/auth';
import { setUser } from './authSlice';

// Register user
export const register = createAsyncThunk(
    'auth/register',
    async (userData: { email: string; password: string; name: string }, { dispatch, rejectWithValue }) => {
        try {
            const data = await registerUser(userData);
            const { user, access_token } = data;
            dispatch(setUser({ user, token: access_token }));
            return { user, token: access_token };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Registration failed');
        }
    }
);

// Login user
export const login = createAsyncThunk(
    'auth/login',
    async (userData: { email: string; password: string }, { dispatch, rejectWithValue }) => {
        try {
            // Perform the login action, e.g., make an API call to authenticate the user
            const data = await loginUser(userData); // Ensure loginUser returns { user, access_token }

            // Save user and token in localStorage for persistence across page reloads
            localStorage.setItem('accessToken', data.access_token);

            // Dispatch the action to update the Redux store with user data and token
            dispatch(setUser({ user: data.user, token: data.access_token }));

            // Return user data and token to update the state
            return { user: data.user, token: data.access_token };
        } catch (error: any) {
            console.error('Login thunk error:', error.message || error);
            // If error occurs, reject with an appropriate error message
            return rejectWithValue(error.message || 'Login failed');
        }
    }
);

