import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // default storage (localStorage)
import authReducer from '../features/auth/authSlice'; // Default import

// Persist configuration
const persistConfig = {
    key: 'root',       // Key for root persist store
    storage,           // Using localStorage to persist the state
    whitelist: ['auth'], // Only persist the auth slice (you can add more slices to this array)
};

const persistedReducer = persistReducer(persistConfig, authReducer);

// Create the Redux store with persisted reducer
const store = configureStore({
    reducer: {
        auth: persistedReducer,  // Using the persisted reducer for the auth slice
    },
    // optional middleware for redux-persist
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'], // Ignore serializability check for persist actions
            },
        }),
});

// Persistor instance (used for syncing the store to localStorage)
const persistor = persistStore(store);

export { store, persistor };
export type AppDispatch = typeof store.dispatch; // This defines the correct type for dispatch
export type RootState = ReturnType<typeof store.getState>;
