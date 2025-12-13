import axios from 'axios';
import React from 'react';


const instance  = axios.create({
    baseURL: 'https://bloodx-blood-donation-applicaion.vercel.app'
})
const useAxios = () => {

    return instance;
};

export default useAxios;