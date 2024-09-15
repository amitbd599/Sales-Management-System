import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { verify__Request__API } from '../api/Api';
import Loader from '../helper/Loader';
const PrivateRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    let [loader, setLoader] = useState(true);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === '/' ||
             location.pathname === '/create-invoice' ||
             location.pathname === '/setting' ||
              location.pathname === '/all-invoice' ||
               location.pathname === '/profile') {
            verify__Request__API().then((result) => {
                setLoader(true)
                if (result === true) {
                    setIsAuthenticated(true);
                    setLoader(false)
                } else {
                    setIsAuthenticated(false);
                    setLoader(false)
                }
            });
        }
    }, [location]);

    if (isAuthenticated === true) {
        return <>
        {loader ===true && <Loader/>}
        {children}
        
        </>;
    } else {
        return <>
        
        <Navigate to="/login" />;
        </> 
    }
}


export default PrivateRoute;
