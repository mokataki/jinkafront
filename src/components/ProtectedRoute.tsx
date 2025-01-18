import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { loadUser } from '../features/auth/authSlice';
import { RootState } from '../store';

interface ProtectedRouteProps {
    children: React.ReactNode;
    roles?: string; // Allow checking roles dynamically, defaulting to optional
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
    const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();

    // Ensure user data is loaded on component mount
    useEffect(() => {
        dispatch(loadUser());
    }, [dispatch]);

    // Show loading state if data is still being loaded
    if (isLoading ) {
        return <div>Loading...</div>;
    }

    // Redirect unauthenticated users to login page
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Redirect users without the required role
    if (roles && user?.role !== roles) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
