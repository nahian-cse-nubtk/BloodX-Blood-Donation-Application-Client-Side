import { FaUsers, FaHandHoldingUsd, FaTint } from "react-icons/fa";

const StatCard = ({ icon, title, value, color }) => (
  <div
    className="p-6 bg-white rounded-xl shadow-sm border border-red-100
               hover:shadow-lg hover:border-red-300 transition-all duration-300"
  >
    {/* Icon Circle */}
    <div
      className={`w-14 h-14 flex items-center justify-center rounded-full
      bg-red-50 text-3xl ${color} mb-4 shadow-inner`}
    >
      {icon}
    </div>

    <h2 className="text-4xl font-bold text-gray-900">{value}</h2>

    <p className="text-gray-500 text-lg font-medium mt-1">{title}</p>
  </div>
);

const StatsSection = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
      <StatCard
        icon={<FaUsers />}
        title="Total Donors Registered"
        value={stats.totalDonor}
        color="text-red-600"
      />

      <StatCard
        icon={<FaHandHoldingUsd />}
        title="Total Funds Collected"
        value={`$ ${stats.totalFund}`}
        color="text-red-500"
      />

      <StatCard
        icon={<FaTint />}
        title="Donation Requests"
        value={stats.donationRequests}
        color="text-red-700"
      />
    </div>
  );
};

export default StatsSection;
