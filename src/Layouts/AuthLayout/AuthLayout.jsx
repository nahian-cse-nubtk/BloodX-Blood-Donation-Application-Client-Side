import React from 'react';
import { Outlet } from 'react-router';
import authImage from '/register.avif'

const AuthLayout = () => {
    return (
        <div className='max-w-7xl mx-auto p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2'>
                <div>
                <Outlet></Outlet>
            </div>
            {/* image */}
            <div className='flex items-center justify-center'>
                <img src={authImage} alt="AuthImage" />

            </div>
            </div>

        </div>
    );
};

export default AuthLayout;