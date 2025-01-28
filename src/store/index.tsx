import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage (localStorage)
import authReducer from '../features/auth/authSlice'; // Import auth slice reducer
import tagReducer from '../features/tags/tagSlice'; // Import tag slice reducer
import categoriesReducer from '../features/categories/categorySlice.ts'; // Import categories slice reducer
import colorReducer from '../features/colours/colourSlice.ts'; // Import colors slice reducer
import brandReducer from '../features/brands/brandSlice.ts'; // Import brands slice reducer

// Persist configuration
const persistConfig = {
    key: 'root',       // Key for root persist store
    storage,           // Using localStorage to persist the state
    whitelist: ['auth', 'tags', 'categories', 'colors', 'brands'], // Persist auth, tags, categories, colors, and brands slices
};

// Persisted reducers for auth, tags, categories, colors, and brands
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedTagReducer = persistReducer(persistConfig, tagReducer);
const persistedCategoriesReducer = persistReducer(persistConfig, categoriesReducer);
const persistedColorReducer = persistReducer(persistConfig, colorReducer);
const persistedBrandReducer = persistReducer(persistConfig, brandReducer);

// Create the Redux store with persisted reducers
const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,        // Persisted reducer for auth
        tags: persistedTagReducer,        // Persisted reducer for tags
        categories: persistedCategoriesReducer, // Persisted reducer for categories
        colors: persistedColorReducer,    // Persisted reducer for colors
        brands: persistedBrandReducer,    // Persisted reducer for brands
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
export type AppDispatch = typeof store.dispatch; // Define the correct type for dispatch
export type RootState = ReturnType<typeof store.getState>; // Define the correct type for root state
