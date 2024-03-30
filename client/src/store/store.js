import storage from 'redux-persist/lib/storage';
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';

import {authSlice} from "./auth/authSlice";

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
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false,
    }),
});


store.subscribe(() => {
    console.log('State after dispatch: ', store.getState());
});

export const persistor = persistStore(store, null, () => {
    console.log('Rehydrated state: ', store.getState());
});
