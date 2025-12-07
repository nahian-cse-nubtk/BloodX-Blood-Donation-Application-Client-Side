import React from 'react';
import useRole from '../../../hooks/useRole/useRole';
import DonorHomePage from '../DonorHomePage/DonorHomePage';
import AdminHomepage from '../AdminHomepage/AdminHomepage';
import VolunteerHomepage from '../VolunteerHomePage/VolunteerHomepage';

const DashBoardHome = () => {
    const {userInfo}=useRole()
    if(userInfo.role==='Volunteer'){
        return <VolunteerHomepage></VolunteerHomepage>
    }
    else if(userInfo.role==='Admin'){
        return <AdminHomepage></AdminHomepage>
    }
    else{
        return <DonorHomePage></DonorHomePage>
    }
};

export default DashBoardHome;