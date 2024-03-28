import storage from 'redux-persist/lib/storage';
import { persistStore, persistReducer } from 'redux-persist';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import {authSlice} from "./auth/authSlice";

const middleware = getDefaultMiddleware({
    serializableCheck: {
        isSerializable: value => typeof value !== 'function'
    }
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth'],
}

const persistedReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
    reducer: {
        auth: persistedReducer,
    },
    middleware,
});

export const persistor = persistStore(store);
