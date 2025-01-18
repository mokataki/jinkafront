import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';  // Import Router
import { PersistGate } from 'redux-persist/integration/react';
import {persistor, store} from "./store"; // Import PersistGate

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <Provider store={store}>  {/* Provide the Redux store here */}
            <PersistGate loading={null} persistor={persistor}> {/* Wait for rehydration */}
                <Router>  {/* Wrap the entire app in Router */}
                    <App />
                </Router>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
