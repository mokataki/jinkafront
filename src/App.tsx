import { useEffect, Suspense } from 'react';
import {Navigate, useLocation, useRoutes} from 'react-router-dom';
import routes from './routes'; // Import route configuration
import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import SliderComponent from './components/SliderComponent';
import Footer from './components/layout/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from './features/auth/authSlice';
import { RootState } from './store';

function App() {
    const location = useLocation();
    const dispatch = useDispatch();
    const {  user, isAuthenticated,isLoading } = useSelector((state: RootState) => state.auth);

    // Ensure user data is loaded when the app initializes
    useEffect(() => {
        dispatch(loadUser()); // Dispatch action to load user from localStorage
    }, [dispatch]);

    // Show loading screen if the app is still loading user data
    if (isLoading) {
        return <div>Loading...</div>;
    }
    console.log(user)
    console.log(isAuthenticated)
    if (isAuthenticated && (location.pathname === "/login" || location.pathname === "/register")) {
        return <Navigate to="/" replace />;
    }

    // Render routes
    return (
        <div>
            {/* Conditionally render layout components */}
            {!(location.pathname.includes('/login') || location.pathname.includes('/register') || location.pathname.startsWith('/admin')) && (
                <>
                    <Header />
                    <SliderComponent />
                    <Navbar />
                </>
            )}

            {/* Content rendering */}
            <Suspense fallback={<div>Loading...</div>}>
                {useRoutes(routes)}
            </Suspense>

            {/* Footer */}
            {!(location.pathname.includes('/login') || location.pathname.includes('/register') || location.pathname.startsWith('/admin')) && <Footer />}
        </div>
    );
}

export default App;
