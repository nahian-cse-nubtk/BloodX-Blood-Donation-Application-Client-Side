import React from 'react';
import useRole from '../../hooks/useRole/useRole';
import ForbiddenAccess from '../../Components/ForbiddenAccess/ForbiddenAccess';
import Loading from '../../Components/Loading/Loading';

const AdminRoute = ({children}) => {
    const {userInfo,isPending}= useRole()
    if(isPending){
        return <Loading></Loading>
    }

    if(userInfo.role==='Admin'){
        return children
    }
    else{
        return <ForbiddenAccess></ForbiddenAccess>
    }

};

export default AdminRoute;