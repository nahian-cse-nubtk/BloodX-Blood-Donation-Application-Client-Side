import React from 'react';
import useAuth from '../useAuth/useAuth';
import useAxiosSecure from './../useAxiosSecure/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRole = () => {
    const {user}=useAuth()
    const axiosSecure = useAxiosSecure()
    const {data:userInfo={},isPending} =useQuery({
        queryKey: ['user-role','user-status',user?.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/users/${user?.email}/role`)
            return {role:res.data?.role || 'Donor',status:res.data?.status || 'Blocked'}

        }
    })
    return {userInfo,isPending}
};

export default useRole;