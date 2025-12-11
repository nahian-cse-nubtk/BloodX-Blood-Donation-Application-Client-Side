import { useQuery } from "@tanstack/react-query";
import {
  FaUser,
  FaTint,
  FaCalendarAlt,
  FaClock,
  FaHospital,
  FaMapMarkerAlt,
  FaRegCommentDots,
  FaListAlt,
  FaArrowLeft,
  FaHandHoldingHeart,
} from "react-icons/fa";
import { useParams, useNavigate } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure/useAxiosSecure";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth/useAuth";
import Swal from "sweetalert2";
import useRole from "../../hooks/useRole/useRole";
import Loading from "../../Components/Loading/Loading";

const DonationDetails = () => {
  const {userInfo} =useRole()
  const { user } = useAuth();
  const modalRef = useRef();
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: request = {},isPending, refetch } = useQuery({
    queryKey: ["donation-request", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationRequests/${id}/request`);
      return res.data;
    },
  });
  const { register, handleSubmit } = useForm({
    defaultValues: {
      donorName: user?.displayName,
      donorEmail: user?.email,
    },
  });
  const handleDonation = (data) => {
    const donorInfo = {
      donorName: data.donorName,
      donorEmail: data.donorEmail,
      donationStatus: "inprogress",
    };
    axiosSecure
      .patch(`/donationReqest/${id}/acceptRequest`, donorInfo)
      .then((res) => {
        if (res.data.modifiedCount) {
          refetch();
          modalRef.current.close();
          Swal.fire({
            title: "Thank you for accepted request!",
            icon: "success",
            draggable: true,
          });
        }
      });
  };
  if(isPending){
    return <Loading></Loading>
  }
  return (
    <div className="relative max-w-4xl mx-auto p-6 my-10 bg-white shadow-xl rounded-2xl border border-red-200">
      <button
        disabled={request.donationStatus === "inprogress"}
        onClick={() => modalRef.current.showModal()}
        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 mb-5 rounded-xl shadow-md font-semibold transition"
      >
        <FaHandHoldingHeart size={18} /> Donate Now
      </button>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="bg-red-100 p-4 rounded-xl text-red-600">
          <FaUser size={28} />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            {request.recipientName}
          </h1>
          <p className="text-gray-500 text-sm">Donation Request Details</p>
        </div>
      </div>

      <div className="h-px w-full bg-red-100 my-6"></div>

      {/* DETAILS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DetailItem
          icon={<FaMapMarkerAlt />}
          label="Recipient District"
          value={request.recipientDistrict}
        />

        <DetailItem
          icon={<FaMapMarkerAlt />}
          label="Recipient Upazila"
          value={request.recipientUpazila}
        />

        <DetailItem
          icon={<FaHospital />}
          label="Hospital Name"
          value={request.hospitalName}
        />

        <DetailItem
          icon={<FaListAlt />}
          label="Full Address"
          value={request.fullAddress}
        />

        <DetailItem
          icon={<FaTint />}
          label="Blood Group"
          value={request.bloodGroup}
          red
        />

        <DetailItem
          icon={<FaCalendarAlt />}
          label="Donation Date"
          value={request.donationDate}
        />

        <DetailItem
          icon={<FaClock />}
          label="Donation Time"
          value={request.donationTime}
        />
      </div>

      <div className="h-px w-full bg-red-100 my-6"></div>

      {/* MESSAGE */}
      <div className="bg-red-50 p-5 rounded-xl border border-red-200">
        <h3 className="text-lg font-semibold text-red-700 flex items-center gap-2 mb-2">
          <FaRegCommentDots /> Request Message
        </h3>
        <p className="text-gray-700 leading-relaxed">
          {request.requestMessage}
        </p>
      </div>

      {/* STATUS */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 px-4 py-2 rounded-lg font-medium transition shadow-sm"
        >
          <FaArrowLeft size={14} /> Back
        </button>
      </div>

      <div className="mt-5">
        <span
          className={`px-5 py-2 text-sm font-bold rounded-full
          ${
            request.donationStatus === "pending"
              ? "bg-yellow-200 text-yellow-700"
              : request.donationStatus === "inprogress"
              ? "bg-blue-200 text-blue-700"
              : request.donationStatus === "done"
              ? "bg-green-200 text-green-700"
              : "bg-red-200 text-red-700"
          }`}
        >
          {request.donationStatus?.toUpperCase()}
        </span>
      </div>
      <dialog ref={modalRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Yours Info</h3>
          <form onSubmit={handleSubmit(handleDonation)} className="space-y-4">
            <label className="font-semibold mb-1 block">Donor Name</label>
            <input
              {...register("donorName")}
              className="input input-bordered w-full"
              readOnly
            />
            <label className="font-semibold mb-1 block">Donor Email</label>
            <input
              {...register("donorEmail")}
              className="input input-bordered w-full"
              readOnly
            />
            <div>
              <button
                type="submit"
                className="btn text-white bg-red-600 rounded-md"
              >
                Confirm
              </button>
            </div>
          </form>

          <div className="modal-action">
            <button
              onClick={() => modalRef.current.close()}
              className="btn text-white bg-red-600 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DonationDetails;

const DetailItem = ({ icon, label, value, red }) => {
  return (
    <div className="flex items-start gap-3">
      <div
        className={`p-3 rounded-xl ${
          red ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
        }`}
      >
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p
          className={`font-semibold ${red ? "text-red-600" : "text-gray-800"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
};
