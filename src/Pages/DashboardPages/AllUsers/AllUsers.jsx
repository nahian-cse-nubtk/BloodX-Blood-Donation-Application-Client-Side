import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import useAxiosSecure from "../../../hooks/useAxiosSecure/useAxiosSecure";

import { toast } from "react-toastify";
import { FaAngleDown } from "react-icons/fa";
import Loading from "../../../Components/Loading/Loading";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const {
    data: users = {},
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users", page, status],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users?status=${status}&skip=${page * 5}&limit=5`
      );
      return res.data;
    },
  });
  const recentUsers = users?.result;
  const totalUsers = users?.totalUsers;
  const totalPages = Math.ceil(Number(totalUsers) / 5);



  const handleUpdateStatus = (id, status) => {
    const statusInfo = {
      status: status,
    };
    axiosSecure
      .patch(`/users/${id}/changeStatus`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast("Status Updated");
        }
      });
  };
  const handleUpdateRole = (id, role) => {
    const roleInfo = {
      role: role,
    };
    axiosSecure
      .patch(`/users/${id}/changeRole`, roleInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          toast("Role Updated");
        }
      });
  };
  const handleStatusActive = (id) => {
    handleUpdateStatus(id, "Active");
  };
  const handleStatusBlocked = (id) => {
    handleUpdateStatus(id, "Block");
  };
 const handleAssginAdmin =(id)=>{
       handleUpdateRole(id,'Admin')
 }
 const handleRemoveAdmin = (id)=>{
       handleUpdateRole(id,'Donor')
 }
 const handleAssignVolunteer =(id)=>{
       handleUpdateRole(id,'Volunteer')
 }
 const handleRemoveVolunteer= (id)=>{
       handleUpdateRole(id,'Donor')
 }
 if (isPending) return <Loading></Loading>
  return (
    <div className="p-6 space-y-8">
      {recentUsers.length === 0 && (
        <div className="text-4xl font-bold text-red-400 my-20 text-center">
          <h1>There is now user now</h1>
        </div>
      )}
      {/* all users */}
      {recentUsers.length > 0 && (
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-semibold mb-4">All Users</h2>
          <div className="flex justify-end my-4">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">
                Filtered By Status <FaAngleDown />
              </div>
              <ul
                tabIndex="-1"
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <li>
                  <button onClick={() => setStatus("Active")}>Active</button>
                </li>

                <li>
                  <button onClick={() => setStatus("Block")}>Blocked</button>
                </li>
                <li>
                  <button onClick={() => setStatus("")}>All</button>
                </li>
              </ul>
            </div>
          </div>
          <div className="overflow-x-auto rounded-xl border">
            <table className="table w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th>User Avatar</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>User Role</th>
                  <th>User Status</th>
                  <th>Change Status</th>
                  <th>Change Role</th>
                </tr>
              </thead>

              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user.Image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </td>

                    <td className="font-medium">{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.role}</td>

                    <td>{user.status}</td>

                    {/* ACTION BUTTONS */}
                    <td>
                      {user.status === "Active" ? (
                        <button
                          onClick={() => handleStatusBlocked(user._id)}
                          className="btn  btn-md"
                        >
                          Blocked
                        </button>
                      ) : (
                        <button
                          onClick={() => handleStatusActive(user._id)}
                          className="btn  btn-md"
                        >
                          Unblocked
                        </button>
                      )}
                    </td>
                    <td>
                      <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn m-1">
                          Manage Role <FaAngleDown />
                        </div>
                        <ul
                          tabIndex="-1"
                          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                        >
                          <li>
                            <button onClick={()=>handleAssignVolunteer(user._id)} >
                              Assign Volunteer
                            </button>
                          </li>
                          <li>
                            <button onClick={()=>handleRemoveVolunteer(user._id)} >Remove Volunteer</button>
                          </li>
                          <li>
                            <button onClick={()=>handleAssginAdmin(user._id)} >Assign Admin</button>
                          </li>
                          <li>
                            <button onClick={()=>handleRemoveAdmin(user._id)} >
                              Remove Admin
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
      {recentUsers.length > 0 && (
        <div className="text-right flex justify-center">
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
      )}
    </div>
  );
};

export default AllUsers;
