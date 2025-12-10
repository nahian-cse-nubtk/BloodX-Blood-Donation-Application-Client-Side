import React from 'react';
import { useNavigate } from 'react-router';
import appNotFoundImage from '/App-Error.png'

const AppNotFound = () => {
    const navigate = useNavigate()
    return (
       <div className="space-y-5 flex flex-col items-center justify-center my-10">
             <img className="h-70" src={appNotFoundImage} alt="App Not Found" />
             <div className="space-y-5 text-center">

               <h1 className="text-4xl text-red-500 font-bold">Oops! App not found</h1>
               <p className="text-3xl">The app you are looking for is not available</p>
               <button
                 className="btn bg-red-600 text-white rounded-md"
                 onClick={() => navigate("/")}
               >
                 Go Back!
               </button>
             </div>
           </div>
    );
};

export default AppNotFound;