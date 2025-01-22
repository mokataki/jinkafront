import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage)
import authReducer from '../features/auth/authSlice'; // Import auth slice reducer
import tagReducer from '../features/tags/tagSlice'; // Import tag slice reducer

// Persist configuration for auth and tags (or any other slices you want to persist)
const persistConfig = {
    key: 'root',       // Key for root persist store
    storage,           // Using localStorage to persist the state
    whitelist: ['auth', 'tags'], // Persist auth and tags slices
};

// Persisted reducers for auth and tags
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedTagReducer = persistReducer(persistConfig, tagReducer);

// Create the Redux store with persisted reducers
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,  // Persisted reducer for auth
        tags: persistedTagReducer,   // Persisted reducer for tags
    },
    // Optional middleware for redux-persist
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
export type RootState = ReturnType<typeof store.getState>; // This defines the correct type for root state
