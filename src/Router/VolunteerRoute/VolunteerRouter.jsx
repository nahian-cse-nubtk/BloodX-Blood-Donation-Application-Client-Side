import React from 'react';
import useRole from '../../hooks/useRole/useRole';

const VolunteerRoute = ({children}) => {
    const {userInfo,isPending}= useRole()
    if(isPending){
        return <p>Loading...</p>
    }

    if(userInfo.role==='Volunteer'){
        return children
    }
    else{
        return <p>Access Forbidden</p>
    }

};

export default VolunteerRoute;