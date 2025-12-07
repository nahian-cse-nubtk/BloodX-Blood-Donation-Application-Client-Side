import React from 'react';
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hooks/useAuth/useAuth";
import { FaCalendarAlt, FaClock, FaTint, FaEdit, FaTrash, FaEye } from "react-icons/fa";

const DonorHomePage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: requests = [], isPending } = useQuery({
    queryKey: ["donor-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests/${user?.email}`);
      return res.data;
    },
  });
 console.log(requests)
  const recentRequests = requests.slice(0, 3);

  if (isPending) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="p-6 space-y-8">

      {/* ------------------ WELCOME CARD ------------------ */}
      <div className="bg-linear-to-r from-red-500 to-red-700 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">Welcome, {user?.displayName} 👋</h1>
        <p className="text-white/90 mt-1">Glad to see you back. Stay ready to save lives!</p>
      </div>


      {/* ------------------ RECENT REQUESTS SECTION ------------------ */}
      {recentRequests.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6">

          <h2 className="text-xl font-semibold mb-4">Your Recent Donation Requests</h2>

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
                    <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
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
                          <button className="btn btn-success btn-xs">Done</button>
                          <button className="btn btn-error btn-xs">Cancel</button>
                        </>
                      )}

                      {/* Edit */}
                      <Link
                        to={`/dashboard/edit-request/${req._id}`}
                        className="btn btn-info btn-xs flex items-center gap-1"
                      >
                        <FaEdit /> Edit
                      </Link>

                      {/* Delete */}
                      <button className="btn btn-warning btn-xs flex items-center gap-1">
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
        <div className="text-right">
          <Link
            to="/dashboard/my-requests"
            className="btn bg-red-600 hover:bg-red-700 text-white"
          >
            View My All Requests →
          </Link>
        </div>
      )}

    </div>
  );
};

export default DonorHomePage;