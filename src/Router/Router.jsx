import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout/RootLayout';
import Home from '../Pages/ApplicationPages/Home/Home';
import Register from '../Pages/Authentication/Register/Register';
import Login from '../Pages/Authentication/Login/Login';

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
    }
])


export default Router;