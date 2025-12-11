import React, { useState } from "react";
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

const AllBloodDonationRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [donationStatus, setDonationStatus] = useState("");

  const [singlePage, setPage] = useState(0);
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
  if (isPending) return <Loading></Loading>

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


  return (
    <div className="p-6 space-y-8">
      {/* ------------------ RECENT REQUESTS SECTION ------------------ */}
      {recentRequests.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-semibold mb-4">All Donation Requests</h2>
          <div className="flex justify-end my-4">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn bg-red-500 text-white m-1">
                Filtered By Donation Status <FaAngleDown />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-red-500 text-white rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <button onClick={() => setDonationStatus("pending")}>
                    Pending
                  </button>
                </li>

                <li>
                  <button onClick={() => setDonationStatus("inprogress")}>
                    Inprogress
                  </button>
                </li>
                <li>
                  <button onClick={() => setDonationStatus("done")}>
                    Done
                  </button>
                </li>
                <li>
                  <button onClick={() => setDonationStatus("cancel")}>
                    Cancelled
                  </button>
                </li>
                <li>
                  <button onClick={() => setDonationStatus("")}>All</button>
                </li>
              </ul>
            </div>
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
                    {/* update donation status */}
                    <td>
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn bg-red-500 text-white ">
                          Change Status <FaAngleDown />
                        </div>
                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu bg-red-500 text-white rounded-box z-1 w-52 p-2 shadow-sm"
                        >
                          <li>
                            <button
                              onClick={() => handleUpdateStatus(req._id,'pending')}
                            >
                              Pending
                            </button>
                          </li>

                          <li>
                            <button
                              onClick={() => handleUpdateStatus(req._id,'inprogress')}
                            >
                              Inprogress
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleUpdateStatus(req._id,'done')}>
                              Done
                            </button>
                          </li>
                          <li>
                            <button onClick={() => handleUpdateStatus(req._id,'cancel')}>
                              Cancelled
                            </button>
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
    </div>
  );
};

export default AllBloodDonationRequests;
