
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import DonationCard from '../../../Components/DonationCard/DonationCard';

const DonationRequests = () => {
    const axiosSecure = useAxiosSecure()
    const {data:requests=[]}=useQuery({
        queryKey: ['requests','donationStatus'],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/donationRequests?donationStatus=pending`)
            return res.data.result
        }
    })

    return (
        <div>
            <h1 className='text-4xl text-center font-bold text-red-400 my-10'>All Donation Requests Here</h1>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                {
                    requests.map(request=><DonationCard request={request}></DonationCard>)
                }

            </div>
        </div>
    );
};

export default DonationRequests;