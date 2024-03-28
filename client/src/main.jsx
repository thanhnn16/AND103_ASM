import {Suspense} from 'react';
import {Provider} from "react-redux";
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
import {HelmetProvider} from 'react-helmet-async';
import {PersistGate} from "redux-persist/integration/react";

import App from './app';
import { store, persistor } from './store/store';
// eslint-disable-next-line import/no-unresolved
import {withAuthCheck} from "./store/middleware/withAuthCheck";

const AuthCheckApp = withAuthCheck(App);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <HelmetProvider>
            <BrowserRouter>
                <Suspense>
                    <AuthCheckApp/>
                </Suspense>
            </BrowserRouter>
        </HelmetProvider>
        </PersistGate>
    </Provider>
);
