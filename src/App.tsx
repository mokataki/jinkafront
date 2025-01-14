import {Suspense} from 'react';
import { useLocation, useRoutes, Navigate } from 'react-router-dom';
import routes from './routes'; // Import your route configuration
import Navbar from './components/layout/Navbar';
import './index.css';
import Header from './components/layout/Header';
import SliderComponent from './components/SliderComponent';
import Footer from './components/layout/Footer';
import { useSelector } from 'react-redux';
import { selectAuth } from './features/auth/authSlice';  // Redux selector for authentication state

function AppRoutes() {
    return useRoutes(routes);
}

function App() {
    const location = useLocation();
    const { isAuthenticated } = useSelector(selectAuth); // Correct usage of useSelector inside a functional component
    console.log(isAuthenticated);
    // Check if user is trying to access login or register pages
    const isAuthPage = location.pathname.includes('/login') || location.pathname.includes('/register');


    // If user is authenticated and trying to access login or register, redirect to home
    if (isAuthenticated && isAuthPage) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            {/* Conditionally render layout components based on the route */}
            {!isAuthPage && (
                <>
                    <Header />
                    <SliderComponent />
                    <Navbar />
                </>
            )}

            {/* Content */}
            <Suspense fallback={<div>Loading...</div>}>
                <AppRoutes />
            </Suspense>

            {/* Footer should also be conditionally rendered */}
            {!isAuthPage && <Footer />}
        </div>
    );
}

export default App;
