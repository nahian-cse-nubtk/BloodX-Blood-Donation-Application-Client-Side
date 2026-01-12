import axios from 'axios';
import React from 'react';


const instance  = axios.create({
    baseURL: 'http://localhost:4000'
})
// https://bloodx-blood-donation-applicaion.vercel.app
const useAxios = () => {

    return instance;
};

export default useAxios;