import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";

import {
  FaCalendarAlt,
  FaClock,
  FaTint,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import { toast } from "react-toastify";

const AllDonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const [singlePage, setPage] = useState(0);
  const {
    data: requests = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["donar-requests-info", singlePage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `donationRequests?skip=${singlePage * 5}&limit=5`
      );
      return res.data;
    },
  });
  const recentRequests = requests?.result;
  const totalRequests = requests?.totalData;
  const totalPages = Math.ceil(Number(totalRequests) / 5);
  console.log(totalPages);
  if (isPending) return <p className="text-center py-10">Loading...</p>;

  const handleDeleteRequest = (id) => {
    axiosSecure.delete(`/donationRequests/${id}/request`).then((res) => {
      if (res.data.deletedCount) {
        refetch();
        toast("Delete successful");
      }
    });
  };
  const handleUpdateStatus = (id, status) => {
    const statusInfo = {
      donationStatus: status,
    };
    axiosSecure
      .patch(`/donationRequests/${id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast("Status Updated");
        }
      });
  };
  const handleStatusDone = (id) => {
    handleUpdateStatus(id, "done");
  };
  const handleStatusCancel = (id) => {
    handleUpdateStatus(id, "cancel");
  };
  return (
    <div className="p-6 space-y-8">
      {/* ------------------ RECENT REQUESTS SECTION ------------------ */}
      {recentRequests.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Your Donation Requests</h2>

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

                    {/* Status */}
                    <td>
                      <span
                        className={`px-3 py-1 rounded-full text-sm
                        ${
                          req.donationStatus === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : req.status === "inprogress"
                            ? "bg-blue-100 text-blue-600"
                            : req.status === "done"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {req.donationStatus}
                      </span>
                    </td>

                    {/* Donor info */}
                    <td className="text-sm">
                      {req.donationStatus === "inprogress" ? (
                        <>
                          <p>{req.donorName}</p>
                          <p className="text-gray-500">{req.donorEmail}</p>
                        </>
                      ) : (
                        <p className="text-gray-400">N/A</p>
                      )}
                    </td>

                    {/* ACTION BUTTONS */}
                    <td className="flex gap-2">
                      {/* Done / Cancel only when inprogress */}
                      {req.donationStatus === "inprogress" && (
                        <>
                          <button
                            onClick={() => handleStatusDone(req._id)}
                            className="btn btn-success btn-xs"
                          >
                            Done
                          </button>
                          <button
                            onClick={() => handleStatusCancel(req._id)}
                            className="btn btn-error btn-xs"
                          >
                            Cancel
                          </button>
                        </>
                      )}

                      {/* Edit */}
                      <Link
                        to={`/dashboard/donationRequestEdit/${req._id}`}
                        className="btn btn-info btn-xs flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteRequest(req._id)}
                        className="btn btn-warning btn-xs flex items-center gap-1"
                      >
                        <FaTrash /> Delete
                      </button>

                      {/* View */}
                      <Link
                        to={`/dashboard/request/${req._id}`}
                        className="btn btn-neutral btn-xs flex items-center gap-1"
                      >
                        <FaEye /> View
                      </Link>
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
             disabled={singlePage===0}
            onClick={() => setPage((p) => Math.max(p - 1, 0))}
            className="btn bg-red-600 hover:bg-red-700 text-white mr-3"
          >
            Prev
          </button>
          <button
          disabled={singlePage===totalPages-1}
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            className="btn bg-red-600 hover:bg-red-700 text-white"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AllDonationRequests;
