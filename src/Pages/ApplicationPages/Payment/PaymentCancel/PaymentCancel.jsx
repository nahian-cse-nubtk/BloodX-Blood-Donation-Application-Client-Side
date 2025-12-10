import React from 'react';
import { useNavigate } from 'react-router';
import cancelImage from '/cancel.avif'
const PaymentCancel = () => {
    const navigate = useNavigate()
    return (
        <div>
           <div className="space-y-5 flex flex-col items-center justify-center my-10">
                         <img className="h-70" src={cancelImage} alt="Payment Cancel" />
                         <div className="space-y-5 text-center">

                           <h1 className="text-3xl text-green-500 font-bold">Opps! Your donation unsuccessfull</h1>
                           <p className="text-xl">Try again please!</p>

                           <button
                             className="btn bg-red-600 text-white rounded-md"
                             onClick={() => navigate("/donateFund")}
                           >
                             Try again!
                           </button>
                         </div>
                       </div>

        </div>
    );
};

export default PaymentCancel;