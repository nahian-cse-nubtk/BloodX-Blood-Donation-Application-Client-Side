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

const Router = createBrowserRouter([
    {
        path: '/',
        Component:RootLayout,
        children:[
            {
                index: true, Component: Home
            },
            {
                path: '/register',
                Component:Register,
                loader: async () => {
                const [districts, upzillas] = await Promise.all([
                fetch('/district.json').then(res => res.json()),
                fetch('/upzilla.json').then(res => res.json()),
                ]);

                return { districts, upzillas };
                },
                hydrateFallbackElement: <p>Loading...</p>
            },
            {
                path: '/login',
                Component: Login
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
                hydrateFallbackElement: <p>Loading...</p>
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
                hydrateFallbackElement: <p>Loading...</p>
            }
        ]
    }
])


export default Router;