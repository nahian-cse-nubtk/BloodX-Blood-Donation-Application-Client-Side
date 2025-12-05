import React from 'react';
import { createBrowserRouter } from 'react-router';
import RootLayout from '../Layouts/RootLayout/RootLayout';
import Home from '../Pages/ApplicationPages/Home/Home';

const Router = createBrowserRouter([
    {
        path: '/',
        Component:RootLayout,
        children:[
            {
                index: true, Component: Home
            }
        ]
    }
])


export default Router;