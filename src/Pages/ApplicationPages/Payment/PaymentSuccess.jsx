import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure/useAxiosSecure';
import Loading from '../../../Components/Loading/Loading';
import successImage from '/success.avif'
const PaymentSuccess = () => {
    const navigate = useNavigate()
    const [donateData, setDonateData]=useState({})
    const axiosSecure = useAxiosSecure()
    const [searchParams]=useSearchParams()
    const sessionId = searchParams.get('sessionId')
    console.log(sessionId)
    useEffect(()=>{
        if(!sessionId) return
        axiosSecure.patch(`/payment-success?sessionId=${sessionId}`)
        .then(res=>{
            
            setDonateData(res.data.fundData);
        })

    },[sessionId])

    if(!donateData){
        return <Loading></Loading>
    }

    return (
        <div className="space-y-5 flex flex-col items-center justify-center my-10">
              <img className="h-70" src={successImage} alt="App Not Found" />
              <div className="space-y-5 text-center">

                <h1 className="text-3xl text-green-500 font-bold">{donateData.donerName} your donation successfull</h1>
                <p className="text-xl"><span className='font-bold'>Your transectionsId:</span> {donateData.transectionId}</p>
                <p className="text-xl"><span className='font-black'>Your trackingId:</span> {donateData.trackingId}</p>
                <button
                  className="btn bg-red-600 text-white rounded-md"
                  onClick={() => navigate("/")}
                >
                  Go Home!
                </button>
              </div>
            </div>
    );
};

export default PaymentSuccess;