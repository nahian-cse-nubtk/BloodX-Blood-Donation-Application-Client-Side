import React from 'react';
import useAuth from '../../hooks/useAuth/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading} = useAuth()
     const location = useLocation()
    if(loading){
        return
    }
    if(!user){
        return <Navigate state={location.pathname} to='/authLayout/login'></Navigate>
    }
    return children;
};

export default PrivateRoute;