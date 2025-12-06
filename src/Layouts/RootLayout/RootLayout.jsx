import React from 'react';
import Navbar from '../../Components/Shared/Navbar/Navbar';
import { Outlet } from 'react-router';
import Footer from '../../Components/Shared/Footer/Footer';
import { ToastContainer } from 'react-toastify';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default RootLayout;