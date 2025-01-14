import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Register from '../pages/Auth/Register';
import Login from '../pages/Auth/Login';
import ProtectedRoute from "../components/ProtectedRoute.tsx";

// Lazy load components
const Home = lazy(() => import('../pages/Home'));
const About = lazy(() => import('../pages/About'));
const Contact = lazy(() => import('../pages/Contact'));
const AdminDashboard = lazy(() => import('../pages/AdminPanel/Dashboard'));

// Route configuration
const routes: RouteObject[] = [
    // Public Routes
    { path: '/', element: <Home /> },
    { path: '/home', element: <Home /> },
    { path: '/about', element: <About /> },
    { path: '/contact', element: <Contact /> },

    // Auth Routes (conditionally rendered based on authentication)
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/register',
        element: <Register />,
    },

    // Protected Routes (Only accessible by authenticated users)
    {
        path: '/admin',
        element: (
            <ProtectedRoute role="ADMIN">
                <AdminDashboard />
            </ProtectedRoute>
        ),
    },
];

export default routes;
