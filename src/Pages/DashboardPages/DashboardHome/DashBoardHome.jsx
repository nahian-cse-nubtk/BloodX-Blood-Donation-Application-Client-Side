import React from 'react';
import useRole from '../../../hooks/useRole/useRole';

const DashBoardHome = () => {
    const {userInfo}=useRole()
    return (
        <div>
            <h1>This is home of dashboard{userInfo.role}</h1>
            <p>{userInfo.status}</p>

        </div>
    );
};

export default DashBoardHome;