import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

import DonationCard from "../../../Components/DonationCard/DonationCard";
import Loading from "../../../Components/Loading/Loading";
import useAxios from "../../../hooks/useAxios/useAxios";

const DonationRequests = () => {
  const axios = useAxios();
  const [page, setPage] = useState(0);
  const [searchText, setSearchText] = useState('')
  const { data: requests = {}, isPending } = useQuery({
    queryKey: ["requests", "donationStatus", page,searchText],
    queryFn: async () => {
      const res = await axios.get(
        `donationRequest/public?donationStatus=pending&limit=8&skip=${page * 8}&searchText=${searchText}`
      );
      return res.data;
    },
  });
  const totalRequests = requests?.total;
  const totalPages = Math.ceil(Number(totalRequests) / 8);
  const handleSearch =(e)=>{
    const text = e.target.value;
    setSearchText(text)
  }

  if (isPending) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h1 className="text-4xl text-center font-bold text-red-500 my-10">
        All Donation Requests Here
      </h1>
      <div className="flex justify-end my-5">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input onChange={handleSearch} type="search" name='search' required placeholder="Search By Recipient Name" />
        </label>
      </div>
      <div>
        {requests.result.length===0&&<div>
            <h1 className="text-3xl font-bold text-red-400 text-center">Opps!! Recpient Not Found</h1>
            </div>}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {requests.result.length>0 && requests.result.map((request) => (
          <DonationCard key={request._id} request={request}></DonationCard>
        ))}
      </div>
      <div className="mt-7">
        {
            requests.result.length>0&&<div className=" text-right flex justify-center">
          <button
            disabled={page === 0}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            className="btn bg-red-600 hover:bg-red-700 text-white mr-3"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="btn bg-red-600 hover:bg-red-700 text-white"
          >
            Next
          </button>
        </div>
        }
      </div>
    </div>
  );
};

export default DonationRequests;
