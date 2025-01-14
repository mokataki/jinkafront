import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuth } from '../features/auth/authSlice';

interface ProtectedRouteProps {
    children: React.ReactNode;
    role?: string; // Make the role check optional
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
    const { isAuthenticated, user } = useSelector(selectAuth);
    const location = useLocation(); // For redirecting to the location the user tried to visit

    // Redirect unauthenticated users to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    // Check for role and redirect if the user's role doesn't match
    if (role && user?.role !== role) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
