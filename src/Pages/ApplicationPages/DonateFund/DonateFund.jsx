import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import { FaAngleDown } from "react-icons/fa";
import {
  FaCalendarAlt,
  FaClock,
  FaTint,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loading/Loading";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth/useAuth";
import axios from "axios";

const DonateFund = () => {
    const {user}=useAuth()
  const axiosSecure = useAxiosSecure();
  const paymentModalRef = useRef()
  const [donationStatus, setDonationStatus] = useState("");

  const [singlePage, setPage] = useState(0);

  const { register, handleSubmit } = useForm({
    defaultValues:{
        fundDonorName: user?.displayName,
        fundDonorEamil: user?.email
    }
  });

  const {
    data: requests = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["donar-requests-info", singlePage, donationStatus],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `donationRequests?donationStatus=${donationStatus}&skip=${
          singlePage * 5
        }&limit=5`
      );
      return res.data;
    },
  });
  const recentRequests = requests?.result;
  const totalRequests = requests?.totalData;
  const totalPages = Math.ceil(Number(totalRequests) / 5);
  console.log(totalPages);
  if (isPending) return <Loading></Loading>;

  const handlePayment =(data)=>{
    const paymentInfo={
        donorName: data.fundDonorName,
        donorEmail: data.fundDonorEamil,
        donateAmount: data.fundAmount
    }
    axiosSecure.post('/create-checkout-session',paymentInfo)
    .then(res=>{
        window.location.href =res.data.url
    })
  }

  return (
    <div className="py-6 space-y-8">
      {/* ------------------ RECENT REQUESTS SECTION ------------------ */}
      {recentRequests.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4">All Donation Requests</h2>
          <div className="flex justify-end mb-4">
            <button onClick={()=>paymentModalRef.current.showModal()} className="btn bg-red-500 text-white">Donate Now</button>
          </div>
          <div className="overflow-x-auto rounded-xl border">
            <table className="table w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Address</th>
                  <th>Date & Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Donor Info</th>
                  <th>Change Donation Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {recentRequests.map((req) => (
                  <tr key={req._id} className="hover:bg-gray-50">
                    {/* Recipient */}
                    <td className="font-medium">{req.recipientName}</td>

                    {/* Location */}
                    <td>
                      {req.recipientDistrict}, {req.recipientUpazila}
                    </td>
                    {/* Address */}
                    <td>{req.fullAddress}</td>
                    {/* Date + Time */}
                    <td>
                      <div className="flex items-center gap-1">
                        <FaCalendarAlt /> {req.donationDate}
                      </div>
                      <div className="flex items-center gap-1">
                        <FaClock /> {req.donationTime}
                      </div>
                    </td>

                    {/* Blood */}
                    <td className="text-red-600 font-bold flex items-center gap-2">
                      <FaTint /> {req.bloodGroup}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------ VIEW ALL REQUESTS BUTTON ------------------ */}
      {recentRequests.length > 0 && (
        <div className="text-right flex justify-center">
          <button
            disabled={singlePage === 0}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            className="btn bg-red-600 hover:bg-red-700 text-white mr-3"
          >
            Prev
          </button>
          <button
            disabled={singlePage === totalPages - 1}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="btn bg-red-600 hover:bg-red-700 text-white"
          >
            Next
          </button>
        </div>
      )}
      <div>
        <dialog ref={paymentModalRef} className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-2xl my-5">Add Payment Info</h3>
            <form onSubmit={handleSubmit(handlePayment)} className="space-y-4" >
                <div>
            <label className="font-semibold mb-1 block">Your Name</label>
            <input
              {...register("fundDonorName", { required: true })}
              className="input input-bordered w-full"
              readOnly

            />
          </div>
                <div>
            <label className="font-semibold mb-1 block">Your Email</label>
            <input
              {...register("fundDonorEamil", { required: true })}
              className="input input-bordered w-full"
              readOnly

            />
          </div>
                <div>
            <label className="font-semibold mb-1 block">Donate Amount</label>
            <input
              {...register("fundAmount", { required: true })}
              className="input input-bordered w-full"
              placeholder="Amount" type="number"
            />
          </div>
          <button className="btn bg-red-500 text-white">Processed to Checkout</button>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn bg-red-500 text-white">Close</button>
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default DonateFund;
