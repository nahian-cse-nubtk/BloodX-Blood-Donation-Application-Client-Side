import React from 'react';
import useRole from '../../hooks/useRole/useRole';
import ForbiddenAccess from '../../Components/ForbiddenAccess/ForbiddenAccess';

const AdminRoute = ({children}) => {
    const {userInfo,isPending}= useRole()
    if(isPending){
        return <p>Loading...</p>
    }

    if(userInfo.role==='Admin'){
        return children
    }
    else{
        return <ForbiddenAccess></ForbiddenAccess>
    }

};

export default AdminRoute;