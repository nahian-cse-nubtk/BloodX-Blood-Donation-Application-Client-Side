import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout/RootLayout';
import Home from '../Pages/ApplicationPages/Home/Home';
import Register from '../Pages/Authentication/Register/Register';

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
            }
        ]
    }
])


export default Router;