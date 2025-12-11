import React, { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";

import Loading from "../../../Components/Loading/Loading";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth/useAuth";


const DonateFund = () => {
    const {user}=useAuth()
  const axiosSecure = useAxiosSecure();
  const paymentModalRef = useRef()

  const [singlePage, setPage] = useState(0);

  const { register, handleSubmit } = useForm({
    defaultValues:{
        fundDonorName: user?.displayName,
        fundDonorEamil: user?.email
    }
  });

  const {
    data: funds = {},
    isPending,

  } = useQuery({
    queryKey: ["fundsData", singlePage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `donateFunds?skip=${
          singlePage * 5
        }&limit=5`
      );
      return res.data;
    },
  });
  const recentFunds = funds?.result;
  const totalfunds = funds?.totalFundData;
  const totalPages = Math.ceil(Number(totalfunds) / 5);

  if (isPending) return <Loading></Loading>;

  const handlePayment =(data)=>{
    const paymentInfo={
        donorName: data.fundDonorName,
        donorEmail: data.fundDonorEamil,
        donateAmount: data.fundAmount
    }
    axiosSecure.post('/create-checkout-session',paymentInfo)
    .then(res=>{
        paymentModalRef.current.close()
        window.location.href =res.data.url
    })
  }

  return (
    <div className="py-6 space-y-8">
      {/* ------------------ RECENT REQUESTS SECTION ------------------ */}
      {recentFunds.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">All Fund Donation</h2>
          <div className="flex justify-end mb-4">
            <button onClick={()=>paymentModalRef.current.showModal()} className="btn bg-red-500 text-white">Donate Fund</button>
          </div>
          <div className="overflow-x-auto rounded-xl border">
            <table className="table w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th>Fund Doner</th>
                  <th>Donate Amount</th>

                  <th>Date & Time</th>
                </tr>
              </thead>

              <tbody>
                {recentFunds.map((fund) => (
                  <tr key={fund._id} className="hover:bg-gray-50">
                    {/* fund doner name */}
                    <td className="font-medium">{fund.donerName}</td>

                    {/* Donate Amount */}
                    <td>
                      {fund.donateAmount}
                    </td>
                    {/* Date and time */}
                    <td>{format(new Date(fund.fundDonateAt), "PPpp")}</td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ------------------ VIEW ALL REQUESTS BUTTON ------------------ */}
      {recentFunds.length > 0 && (
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
