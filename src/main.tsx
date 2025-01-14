import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router } from 'react-router-dom';  // Import Router

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
    <React.StrictMode>
        <Provider store={store}>  {/* Provide the Redux store here */}
            <Router>  {/* Wrap the entire app in Router */}
                <App />
            </Router>
        </Provider>
    </React.StrictMode>
);
