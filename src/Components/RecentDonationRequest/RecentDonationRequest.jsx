
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import DonationCard from '../DonationCard/DonationCard';
import Loading from '../Loading/Loading';
import useAxios from '../../hooks/useAxios/useAxios';

const RecentDonationRequest = () => {
    const axios = useAxios()
    const {data:requests=[],isPending}=useQuery({
        queryKey: ['requests','donationStatus'],
        queryFn: async()=>{
            const res = await axios.get(`donationRequest/public?donationStatus=pending`)
            return res.data
        }
    })
    if(isPending){
        return <Loading></Loading>
    }

    return (
        <div>
            <h1 className='text-4xl md:text-5xl text-center font-bold text-red-500 my-10'>Recent Donation Requests</h1>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                {
                    requests.slice(0,8).map(request=><DonationCard key={request._id} request={request}></DonationCard>)
                }

            </div>
        </div>
    );
};

export default RecentDonationRequest;