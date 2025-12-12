import React from 'react';
import Navbar from '../../Components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Shared/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
    return (
        <div >
            <Navbar></Navbar>
            <div className='md:max-w-7xl mx-auto'>
                <Outlet></Outlet>
            </div>

            <Footer></Footer>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default RootLayout;