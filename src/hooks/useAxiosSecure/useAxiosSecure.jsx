import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: ''
})
const useAxiosSecure = () => {
    return instance;
};

export default useAxiosSecure;