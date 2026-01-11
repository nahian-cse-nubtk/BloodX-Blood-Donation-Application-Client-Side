import { FaUserCircle, FaTint, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const DonorCard = ({ donor }) => {
  return (
    <div className="bg-white dark:bg-gray-700 border border-red-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300">

      {/* Top Section */}
      <div className="flex items-center gap-4">
        <img
          src={donor.Image}
          alt="Donor Avatar"
          className="w-16 h-16 rounded-full border-2 border-red-300 object-cover"
        />

        <div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">{donor.name}</h2>
          <p className="flex items-center gap-2 text-gray-500 dark:text-white text-sm">
            <FaEnvelope /> {donor.email}
          </p>
        </div>
      </div>

      <div className="h-px w-full bg-red-100 my-4"></div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Blood Group */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 text-red-600 rounded-xl">
            <FaTint />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-white">Blood Group</p>
            <p className="text-lg font-semibold text-red-600">{donor.bloodGroup}</p>
          </div>
        </div>

        {/* District */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-100 text-gray-600 dark:text-white rounded-xl">
            <FaMapMarkerAlt />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-white">District</p>
            <p className="font-semibold text-gray-800 dark:text-white">{donor.district}</p>
          </div>
        </div>

        {/* Upazila */}
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-100 text-gray-600 dark:text-white rounded-xl">
            <FaMapMarkerAlt />
          </div>
          <div>
            <p className="text-sm text-gray-500 dark:text-white">Upzilla</p>
            <p className="font-semibold text-gray-800 dark:text-white">{donor.upzilla}</p>
          </div>
        </div>
      </div>



    </div>
  );
};

export default DonorCard;
