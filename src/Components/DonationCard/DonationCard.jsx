import { FaCalendarAlt, FaClock, FaTint, FaMapMarkerAlt, FaUser } from "react-icons/fa";

const DonationCard = ({ request }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-red-200 rounded-2xl p-6 flex flex-col gap-4">

      {/* Header: Recipient */}
      <div className="flex items-center gap-3">
        <div className="bg-red-100 text-red-600 p-3 rounded-xl">
          <FaUser size={22} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">
            {request.recipientName}
          </h2>
          <p className="text-sm text-gray-500">Recipient</p>
        </div>
      </div>

      <div className="h-px bg-red-100 w-full"></div>

      {/* Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Location */}
        <div className="flex items-center gap-3 text-gray-700">
          <span className="bg-red-100 p-2 rounded-lg text-red-600">
            <FaMapMarkerAlt />
          </span>
          <p className="font-medium">
            {request.recipientDistrict}, {request.recipientUpazila}
          </p>
        </div>

        {/* Blood group */}
        <div className="flex items-center gap-3 text-red-600 font-bold">
          <span className="bg-red-100 p-2 rounded-lg">
            <FaTint />
          </span>
          <p className="text-lg">{request.bloodGroup}</p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-3 text-gray-700">
          <span className="bg-red-100 p-2 rounded-lg text-red-600">
            <FaCalendarAlt />
          </span>
          <p className="font-medium">{request.donationDate}</p>
        </div>

        {/* Time */}
        <div className="flex items-center gap-3 text-gray-700">
          <span className="bg-red-100 p-2 rounded-lg text-red-600">
            <FaClock />
          </span>
          <p className="font-medium">{request.donationTime}</p>
        </div>

      </div>

      {/* View Button */}
      <div className="mt-4">
        <button className="btn w-full bg-red-600 hover:bg-red-700 text-white rounded-xl">
          View Details
        </button>
      </div>
    </div>
  );
};

export default DonationCard;
