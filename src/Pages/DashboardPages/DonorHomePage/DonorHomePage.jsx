import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";
import useAuth from "../../../hooks/useAuth/useAuth";
import { MdDone } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import {
  FaCalendarAlt,
  FaClock,
  FaTint,
  FaEdit,
  FaTrash,
  FaEye,

  FaAngleDown,
} from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../../../Components/Loading/Loading";

const DonorHomePage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: requests = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["donor-requests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests/${user?.email}`);
      return res.data;
    },
  });
  console.log(requests);
  const recentRequests = requests.slice(0, 3);

  if (isPending) return <Loading></Loading>;

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
      {/* ------------------ WELCOME CARD ------------------ */}
      <div className="bg-linear-to-r from-red-500 to-red-700 text-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold">Welcome, {user?.displayName} 👋</h1>
        <p className="text-white/90 mt-1">
          Glad to see you back. Stay ready to save lives!
        </p>
      </div>

      {/* ------------------ RECENT REQUESTS SECTION ------------------ */}
      {recentRequests.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Your Recent Donation Requests
          </h2>

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
                    <td>
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1">
                          Actions <FaAngleDown />
                        </div>
                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu bg-red-400 rounded-box z-1 w-52 p-2 shadow-sm"
                        >
                          {req.donationStatus === "inprogress" && (
                        <>
                          <li><button
                            onClick={() => handleStatusDone(req._id)}
                            className="btn bg-red-500 text-white btn-md hover:bg-red-600"
                          >
                            <MdDone /> Done
                          </button></li>
                          <li>
                            <button
                            onClick={() => handleStatusCancel(req._id)}
                            className="btn bg-red-500 text-white btn-md hover:bg-red-600"
                          >
                            <ImCancelCircle /> Cancel
                          </button>
                          </li>
                        </>
                      )}
                      <li>
                        <Link
                        to={`/dashboard/donationRequestEdit/${req._id}`}
                        className="btn bg-red-500 text-white btn-md flex items-center gap-1 hover:bg-red-600"
                      >
                        <FaEdit /> Edit
                      </Link>

                      </li>

                      <li>
                        <button
                        onClick={() => handleDeleteRequest(req._id)}
                        className="btn bg-red-500 text-white btn-md flex items-center gap-1 hover:bg-red-600"
                      >
                        <FaTrash /> Delete
                      </button>

                      </li>
                      <li>
                        <Link
                        to={`/donationDetails/${req._id}`}
                        className="btn bg-red-500 text-white btn-md flex items-center gap-1 hover:bg-red-600"
                      >
                        <FaEye /> View
                      </Link>
                      </li>
                        </ul>
                      </div>
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
            to="/dashboard/myDonationRequest"
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
