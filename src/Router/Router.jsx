import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout/RootLayout';
import Home from '../Pages/ApplicationPages/Home/Home';
import Register from '../Pages/Authentication/Register/Register';
import Login from '../Pages/Authentication/Login/Login';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import DashboardLayout from '../Layouts/DashboardLayout/DashboardLayout';
import DashBoardHome from '../Pages/DashboardPages/DashboardHome/DashBoardHome';
import Profile from '../Pages/DashboardPages/Profile/Profile';
import CreateDonataionRequest from '../Pages/DashboardPages/CreateDonationRequest/CreateDonataionRequest';
import MyDonationRequest from '../Pages/DashboardPages/MyDonationRequest/MyDonationRequest';
import DonationRequestEdit from '../Pages/DashboardPages/DonationRequestEdit/DonationRequestEdit';
import AllUsers from '../Pages/DashboardPages/AllUsers/AllUsers';
import AdminRoute from './AdminRoute/AdminRoute';
import AllDonationRequests from '../Pages/DashboardPages/AllDonationRequests/AllDonationRequests';
import VolunteerRoute from './VolunteerRoute/VolunteerRouter';
import AllBloodDonationRequests from '../Pages/DashboardPages/AllBloodDonationRequests/AllBloodDonationRequests';
import DonationRequests from '../Pages/ApplicationPages/DonationRequests/DonationRequests';
import DonationDetails from '../Pages/DonationDetails/DonationDetails';
import SearchDonor from '../Pages/ApplicationPages/SearchDonor/SearchDonor';
import AuthLayout from '../Layouts/AuthLayout/AuthLayout';
import PageNotFound from '../Components/PageNotFound/PageNotFound';
import AppNotFound from '../Components/AppNotFound/AppNotFound';
import Loading from '../Components/Loading/Loading';
import DonateFund from '../Pages/ApplicationPages/DonateFund/DonateFund';
import PaymentSuccess from '../Pages/ApplicationPages/Payment/PaymentSuccess';
import PaymentCancel from '../Pages/ApplicationPages/Payment/PaymentCancel/PaymentCancel';


const Router = createBrowserRouter([
    {
        path: '/',
        Component:RootLayout,
        children:[
            {
                index: true, Component: Home
            },


            {
                path: '/requests',
                Component: DonationRequests
            },
            {
                path:'/searchDonor',
                Component: SearchDonor,
                loader: async () => {
                const [districts, upzillas] = await Promise.all([
                fetch('/district.json').then(res => res.json()),
                fetch('/upzilla.json').then(res => res.json()),
                ]);

                return { districts, upzillas };
                },
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: '/donateFund',
                element: <PrivateRoute><DonateFund></DonateFund></PrivateRoute>
            },
            {
                path:'/paymentSussess',
                Component: PaymentSuccess
            },
            {
                path:'/paymentCancel',
                Component: PaymentCancel
            }
        ]
    },
    {
        path:'/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children:[
            {
                index: true,
                Component: DashBoardHome
            },
            {
                path: 'profile',
                Component: Profile,
                loader: async () => {
                const [districts, upzillas] = await Promise.all([
                fetch('/district.json').then(res => res.json()),
                fetch('/upzilla.json').then(res => res.json()),
                ]);

                return { districts, upzillas };
                },
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path: 'createDonationRequest',
                element: <PrivateRoute><CreateDonataionRequest></CreateDonataionRequest></PrivateRoute>,
                loader: async () => {
                const [districts, upzillas] = await Promise.all([
                fetch('/district.json').then(res => res.json()),
                fetch('/upzilla.json').then(res => res.json()),
                ]);

                return { districts, upzillas };
                },
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path:'myDonationRequest',
                element: <PrivateRoute><MyDonationRequest></MyDonationRequest></PrivateRoute>
            },
            {
                path: 'donationRequestEdit/:id',
                element: <PrivateRoute><DonationRequestEdit></DonationRequestEdit></PrivateRoute>,
                loader: async () => {
                const [districts, upzillas] = await Promise.all([
                fetch('/district.json').then(res => res.json()),
                fetch('/upzilla.json').then(res => res.json()),
                ]);

                return { districts, upzillas };
                },
                hydrateFallbackElement: <Loading></Loading>
            },
            {
                path:'allUsers',
                element: <PrivateRoute><AdminRoute><AllUsers></AllUsers></AdminRoute></PrivateRoute>
            },
            {
                path:'allDonationRequests',
                element: <PrivateRoute><AdminRoute><AllDonationRequests></AllDonationRequests></AdminRoute></PrivateRoute>
            },
            {
                path: 'allRequests',
                element: <PrivateRoute><VolunteerRoute><AllBloodDonationRequests></AllBloodDonationRequests></VolunteerRoute></PrivateRoute>
            }
        ]
    },
    {
        path: '/donationDetails/:id',
        element: <PrivateRoute><DonationDetails></DonationDetails></PrivateRoute>,
        errorElement: <AppNotFound></AppNotFound>
    },
    {
        path:'/authLayout',
        Component: AuthLayout,
        children:[
            {
                path: 'login',
                Component: Login
            },
            {
                path: 'register',
                Component:Register,
                loader: async () => {
                const [districts, upzillas] = await Promise.all([
                fetch('/district.json').then(res => res.json()),
                fetch('/upzilla.json').then(res => res.json()),
                ]);

                return { districts, upzillas };
                },
                hydrateFallbackElement: <Loading></Loading>
            }
        ]
    },
    {
        path: '*',
        Component: PageNotFound
    }

])


export default Router;