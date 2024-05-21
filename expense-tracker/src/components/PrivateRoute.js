import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useContext(AuthContext);
    
    console.log(isAuthenticated)
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; 
    }

    return <Outlet />; 
};

export default PrivateRoute;
