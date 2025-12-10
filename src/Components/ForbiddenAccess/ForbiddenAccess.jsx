import React from 'react';
import accessDenied from '/accessDenied.jpg'
import { useNavigate } from 'react-router';
const ForbiddenAccess = () => {
    const navigate = useNavigate()
    return (
        <div className="space-y-5 flex flex-col items-center justify-center my-10">
            <img className='h-40' src={accessDenied} alt="Access Forbidden" />
            <div className='space-y-5 text-center'>
                <h1 className='text-6xl text-red-500 font-bold'>403</h1>
                <h1 className='text-4xl'>Oops!</h1>
                <p className='text-3xl'>Access Denied-Forbidden</p>
                <button className='btn bg-red-600 text-white rounded-md' onClick={()=>navigate('/')}>Back to home</button>
            </div>

        </div>
    );
};

export default ForbiddenAccess;