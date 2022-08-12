import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isJWT = localStorage.getItem('JWT')

    return isJWT ? children : <Navigate to="/Login" />
};

export default PrivateRoute;