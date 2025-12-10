import React from 'react';
import useRole from '../../hooks/useRole/useRole';
import ForbiddenAccess from '../../Components/ForbiddenAccess/ForbiddenAccess';

const VolunteerRoute = ({children}) => {
    const {userInfo,isPending}= useRole()
    if(isPending){
        return <p>Loading...</p>
    }

    if(userInfo.role==='Volunteer'){
        return children
    }
    else{
        return <ForbiddenAccess></ForbiddenAccess>
    }

};

export default VolunteerRoute;