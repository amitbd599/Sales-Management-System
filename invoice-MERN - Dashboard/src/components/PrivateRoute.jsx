import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { verify__Request__API } from '../api/Api';
const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/' || location.pathname === '/setting' || location.pathname === '/all-invoice' || location.pathname === '/profile') {
            verify__Request__API().then((result) => {

                if (result === true) {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            });
        }
    }, [location]);

    if (isAuthenticated === true) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
}


export default PrivateRoute;
