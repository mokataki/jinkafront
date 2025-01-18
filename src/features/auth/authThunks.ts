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
            console.error('Login thunk error:', error); // Log the full error object

            // Log the error response structure to check if it has a message
            if (error?.response) {
                console.log('Error Response:', error.response);
            }

            // Check if the error is from the backend response, and extract the message
            if (error?.response?.data?.message) {
                const backendError = error.response.data.message;
                console.log('Backend Error Message:', backendError); // Log the message

                // Translate error messages to Persian if necessary
                if (backendError === 'Invalid credentials') {
                    return rejectWithValue('اطلاعات ورود اشتباه است.');
                } else if (backendError === 'User not found') {
                    return rejectWithValue('کاربر پیدا نشد.');
                }

                // Fallback to the backend error message
                return rejectWithValue(backendError);
            }

            // Default fallback error message for network or other errors
            return rejectWithValue('اطلاعات ورود اشتباه است.');
        }
    }
);






