import axios from 'axios';
import React from 'react';


const instance  = axios.create({
    baseURL: ''
})
const useAxios = () => {
    return instance;
};

export default useAxios;